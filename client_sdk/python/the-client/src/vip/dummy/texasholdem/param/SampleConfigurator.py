from Configurator import Configurator


class SampleConfigurator(Configurator):
    def beforeRequest(self, headers):
        print(headers)

    def afterResponse(self, handshakeResponse):
        print(handshakeResponse)
