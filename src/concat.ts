export function setupCounter(form: HTMLFormElement): any {
  const formHandler = (event: SubmitEvent) => {
    if (!event) return;

    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const result = `${data.localhost}:${data.port}/?providerId=${data.providerId}&token=${data.token}`;
    return result;
  };
  form.addEventListener('submit', formHandler);

  return formHandler;
}
