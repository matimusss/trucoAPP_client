const { exec } = require('child_process');

// Comandos en la carpeta raíz
const commandsRoot = [
  'react-scripts start',
  'npm run serve'
];

// Comandos en la carpeta server_example
const commandsServerExample = [
  'cd server_example && npm run serve'
];

// Ejecuta los comandos en la carpeta raíz
function runCommandsRoot(index) {
  if (index < commandsRoot.length) {
    const command = commandsRoot[index];
    console.log(`Ejecutando en la carpeta raíz: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error en el comando: ${command}\n${stderr}`);
        return;
      }

      console.log(`Salida del comando: ${stdout}`);
      runCommandsRoot(index + 1);
    });
  } else {
    // Cuando terminan los comandos en la carpeta raíz, ejecuta los comandos en server_example
    runCommandsServerExample(0);
  }
}

// Ejecuta los comandos en la carpeta server_example
function runCommandsServerExample(index) {
  if (index < commandsServerExample.length) {
    const command = commandsServerExample[index];
    console.log(`Ejecutando en la carpeta server_example: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error en el comando: ${command}\n${stderr}`);
        return;
      }

      console.log(`Salida del comando: ${stdout}`);
      runCommandsServerExample(index + 1);
    });
  }
}

// Inicia ejecución
runCommandsRoot(0);
