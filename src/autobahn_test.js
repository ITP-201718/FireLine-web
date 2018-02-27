import autobahn from 'autobahn'

const init = () => {

    const connection = new autobahn.Connection({
        url: 'wss://demo.crossbar.io/ws',
        realm: 'realm1',
    })

    connection.onopen = function (session) {
        console.log("Autobahn Onopen")

        // 1) subscribe to a topic
        function onevent(args) {
            console.log("Event:", args[0]);
        }

        session.subscribe('com.myapp.hello', onevent);

        // 2) publish an event
        session.publish('com.myapp.hello', ['Hello, world!']);

        // 3) register a procedure for remoting
        function add2(args) {
            return args[0] + args[1];
        }

        session.register('com.myapp.add2', add2);

        // 4) call a remote procedure
        session.call('com.myapp.add2', [2, 3]).then(
            function (res) {
                console.log("Result:", res);
            }
        );
    };

    connection.open();
}

export default init