// Inicializa el objeto Particle
var particle = new Particle();
var token;

// Inicia sesión en la API de Particle
particle.login({ username: 'rjimenez@ucol.mx', password: 'K7RM839C2' })
    .then(function(data) {
        token = data.body.access_token; // Guarda el token de acceso
    })
    .catch(function(err) {
        console.log('Could not log in.', err); // Muestra un error si no se puede iniciar sesión
    });

// Actualiza el estado del dispositivo cada segundo
setInterval(function() {
    var breaker1 = document.getElementById('Breaker1');
    breaker1.oninput = function() {
        var output = document.getElementById('state1');
        output.innerHTML = this.value; // Actualiza el valor mostrado
        var Salida1 = this.value; // Obtiene el valor del control deslizante

        // Llama a la función del dispositivo Particle
        particle.callFunction({
            deviceId: '240046000e47313037363132',
            name: 'led',
            argument: Salida1,
            auth: token
        })
        .then(function(result) {
            console.log('Function called successfully:', result);
        })
        .catch(function(err) {
            console.log('Error calling function:', err);
        });
    };
}, 1000);
