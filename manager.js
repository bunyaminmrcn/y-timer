const Emitter = require("./client/src/ee");
const { Notification } = require("electron");
const path = require("path");

const os = require('os')
const init = () => {
  console.log({ init: "Manager initialized" });
  Emitter.on("on_notify", async (data) => {
    const notification = new Notification({
      title: "HEllo",
      body: 'World',
      icon: path.join(__dirname, "icon.png"),
      //sound: path.join(__dirname, 'assets', 'sounds', 'sound.mp3'),
      actions: [
        { text: "Suspend", type: "button" },
        { text: "Cancel", type: "button" },
      ],
      urgency: "critical",
      toastXml: `
            <toast launch="timer_app:action=navigate&amp;contentId=350" activationType="protocol">
                <visual>
                    <binding template="ToastGeneric">
                        <text>Hello world</text>
                    </binding>
                </visual>
                <actions>
                    <action
                        content="See more details"
                        arguments="timer_app:action=viewDetails&amp;contentId=350"
                        activationType="protocol"/>

                    <action
                        content="Remind me later"
                        arguments="timer_app:action=remindlater&amp;contentId=350"
                        activationType="protocol"/>
                </actions>
            </toast>`,
    });
    //sound.play();
    //const audic = new Audic(path.join(__dirname, 'assets', 'sounds','sound.mp3'));

    notification.on("action", (_, index) => {
      console.log(_, index);
    });
    

    notification.on('click', (_, index) => {
     console.log({i: _, index})
    })
    notification.show();
    // $ mplayer foo.mp3

  });
};

module.exports = { init };
