from __future__ import print_function
import httplib2, os, unittest
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
from apiclient import errors

# If modifying these scopes, delete your previously saved credentials
class TestFunctions(unittest.TestCase):

    @classmethod
    def _get_credentials(self):
        """ Gets valid user credentials from storage.
        If nothing has been stored, or if the stored credentials are invalid,
        the OAuth2 flow is completed to obtain the new credentials.

        Returns:
            Credentials, the obtained credential.
        """
        scopes = (
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/forms',
            'https://www.googleapis.com/auth/fusiontables.readonly',
            'https://www.googleapis.com/auth/script.external_request',
            'https://www.googleapis.com/auth/script.send_mail',
            'https://www.googleapis.com/auth/script.storage',
            'https://www.googleapis.com/auth/spreadsheets',
        )
        client_secret_fn = 'exc_client_secret.json'
        application_name = 'Snapbot Sightings Test'
        home_dir = os.path.expanduser('~')
        credential_dir = os.path.join(home_dir, '.credentials')

        try:
            import argparse
            flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
        except ImportError:
            flags = None
        if not os.path.exists(credential_dir):
            os.makedirs(credential_dir)

        credential_fn = '%s.json' % application_name.lower().replace(' ','_', 3)
        credential_path = os.path.join(credential_dir, credential_fn)
        store = Storage(credential_path)
        credentials = store.get()

        if not credentials or credentials.invalid:
            flow = client.flow_from_clientsecrets(client_secret_fn, scopes)
            flow.user_agent = application_name
            if flags:
                credentials = tools.run_flow(flow, store, flags)
            else: # Needed only for compatibility with Python 2.6
                credentials = tools.run(flow, store)
            print('Storing credentials to ' + credential_path)

        return credentials

    @classmethod
    def setUpClass(self):
        """ Define persistent shared resources between tests.

        This method runs once before any tests are run.
        """
        credentials = self._get_credentials()
        http = credentials.authorize(httplib2.Http())
        self.service = discovery.build('script', 'v1', http=http)
        self.emails = {
            'both': 'both@foo.bar',
            'countdown': 'countdown@foo.bar',
            'locations': 'locations@foo.bar'
        }
        self.script_id = os.environ['SCRIPT_ID']

    def setUp(self):
        """ Define per-test resources.

        Resets to these values before every test.
        """
        self.request = {
            'function': None,
            'parameters': [True],
            'devMode': True
        }

    def _run(self, func):
        """ Execute a function defined in the GAS project.

        Params:
            func {string} function name.

        Return:
            {array} results of the request.
        """
        self.request['function'] = func
        params = {
            'body': self.request,
            'scriptId': self.script_id,
        }
        res = self.service.scripts().run(**params).execute()
        return res['response']['result']

    def test_get_countdown_subscribers(self):
        """ Verify function that fetches countdown subscribers """
        results = self._run('get_countdown_subscribers')
        self.assertTrue(self.emails['countdown'] in results)
        self.assertTrue(self.emails['both'] in results)
        self.assertFalse(self.emails['locations'] in results)

    def test_get_location_subscribers(self):
        """ Verify function that fetches location subscribers """
        results = self._run('get_location_subscribers')
        self.assertFalse(self.emails['countdown'] in results)
        self.assertTrue(self.emails['both'] in results)
        self.assertTrue(self.emails['locations'] in results)

if __name__ == '__main__':
    unittest.main()
