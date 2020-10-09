import io from 'socket.io-client';

var SocketSingleton = (function () {
    var instance;

    function createInstance() {
        var socket = io.connect();;
        return socket;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default SocketSingleton
