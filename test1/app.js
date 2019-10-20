const Gpio = require('onoff').Gpio;
const request = require('request');
const { exec } = require('child_process');
const server_host = process.env.SERVER_HOST;
const server_auth_token = process.env.SERVER_AUTH_TOKEN;

const led_motion = new Gpio(17, 'out');
const led_button = new Gpio(26, 'out');
const motion_sensor = new Gpio(4, 'in', 'both');
const button = new Gpio(12, 'in', 'both');

var settings = {
  "motion_active": true,
  "motion_email_active": true
};

const updateSettings = (settings) => {
  request(`${server_host}/rasp_configs.json?auth_token=${server_auth_token}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    Object.keys(body).forEach((key) => {
      settings[key] = body[key];
    });
  });
};
setInterval(updateSettings, 12*1000, settings);
const takeSnapshot = (camera='CAM1', trigger='movement') => {
  console.log('Starting snapshot');
  let timestamp = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/, '-');
  let filename = 'snapshot-'+timestamp+'.jpg';
  console.log(filename);
  exec('raspistill -o "snapshots/'+filename+'" -t 306', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log('Error taking snapshot');
      return;
    }
    console.log('executed snapshot');
    //if(!settings.motion_email_active) return;

    exec(`curl -F "snapshot=@snapshots/${filename};filename=${filename}" -F "camera=${camera}" -F "trigger=${trigger}" -X POST ${server_host}/camera_snapshots?auth_token=${server_auth_token}`, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        console.log('Error posting snapshot');
	console.log(err);
        return;
      }
      console.log('Posted snapshot');
    });

  });
};

motion_sensor.watch((err, value) => {
  if (err) {
    throw err;
  }

  led_motion.writeSync(value);
  if (value && settings.motion_active) takeSnapshot('CAM1', 'movement');
});

button.watch((err, value) => {
  if (err) {
    throw err;
  }

  led_button.writeSync(value);
  if (value) takeSnapshot('CAM1', 'button');
});

process.on('SIGINT', () => {
  led_motion.unexport();
  led_button.unexport();
  motion_sensor.unexport();
  button.unexport();
});
