window.addEventListener("DOMContentLoaded", () => {
  const form = document.forms[0];

  initialize(form);

  submitForm(form);
});

// get controls of the form
const getControls = (form) => {
  const eventName = form.eventName;
  const category = form.eventCategory;
  const action = form.eventAction;
  const label = form.eventLabel;
  const interaction = form.eventInteraction;
  const button = form.btnSend;

  return { eventName, category, action, label, interaction, button };
};

// start data of the form
const initialize = (form) => {
  const { eventName, category, action, label, interaction } = getControls(form);

  eventName && (eventName.value = "home_click");
  category && (category.value = "home");
  action && (action.value = "click");
  label && (label.value = "home");
  interaction && (interaction.value = "0");
};

const showMessage = (text = "") => {
  const snackbar = document.querySelector("#snackbar");
  snackbar.className = "show";
  snackbar.innerHTML = text;

  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
    snackbar.innerHTML = "";
  }, 3000);
};

// send data of the form
const submitForm = (form) => {
  const { eventName, category, action, label, interaction, button } =
    getControls(form);
  const AnalyticsWebInterface = window.AnalyticsWebInterface;

  if (button === undefined || button === null) {
    return;
  }

  button &&
    button.addEventListener("click", (evt) => {
      evt.preventDefault();

      console.log({ AnalyticsWebInterface });
      if (
        AnalyticsWebInterface === undefined ||
        AnalyticsWebInterface === null
      ) {
        showMessage("No existe AnalyticsWebInterface");
        return;
      }

      const event_name = (eventName && eventName.value) || "";
      const event_category = (category && category.value) || "";
      const event_action = (action && action.value) || "";
      const event_label = (label && label.value) || "";
      const event_interaction = (interaction && interaction.value) || "";

      const params = {
        event_category,
        event_action,
        event_label,
        event_interaction,
      };
      console.log({ event_name, params });
      AnalyticsWebInterface.AnalyticsWebInterface.logEvent(event_name, params);
    });
};
