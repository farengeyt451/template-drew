import './style.css';

let resultUrl: string;

const inputResult = document.querySelector<HTMLInputElement>('#result')!;
const form = document.querySelector<HTMLFormElement>('#url-concat')!;
const textareaResult = document.querySelector<HTMLFormElement>('#result')!;
const btnCopy = document.querySelector<HTMLFormElement>('#copy')!;
const btnOpen = document.querySelector<HTMLFormElement>('#open')!;
const btnClear = document.querySelectorAll<HTMLFormElement>('.c_url__btn--clear')!;

const formHandler = (event: SubmitEvent) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  const result = `http://${data.localhost}:${data.port}/?providerId=${data.providerId}&token=${data.token}`;
  resultUrl = result;
  inputResult.value = resultUrl;
};

const copyContent = async () => {
  if (!resultUrl) return;

  try {
    await navigator.clipboard.writeText(resultUrl);
    console.log('Content copied to clipboard');
    console.info(`🌻 ${resultUrl}`);
    btnCopy.innerText = 'Done';
  } catch (err) {
    console.error('Failed to copy: ', err);
    btnCopy.innerText = 'Some error';
  } finally {
    setTimeout(() => {
      btnCopy.innerText = 'Copy to clipboard';
    }, 1000);
    clearResult();
  }
};

const openInNewTab = () => {
  if (!resultUrl) return;

  window.open(resultUrl, '_blank');
  clearResult();
};

const clearInput = (event: MouseEvent) => {
  event.preventDefault();
  const inputId = (event.target as HTMLElement).attributes.getNamedItem('data-input')?.value;
  const input = inputId && document.getElementById(inputId);

  if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
    input.value = '';
  }
};

const clearResult = () => {
  textareaResult.value = '';
}

form.addEventListener('submit', formHandler);
btnCopy.addEventListener('click', copyContent);
btnOpen.addEventListener('click', openInNewTab);
btnClear.forEach(btn => btn.addEventListener('click', clearInput));
