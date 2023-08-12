import './style.css';

const TEMPLATE = `{
  "cc": "US",
  "city": "Pasadena",
  "country": "United States",
  "formatted_address": "8120 Jumpers Hole Road, Pasadena, MD, United States",
  "formatted_city": "Pasadena, MD, United States",
  "postal_code": "21122",
  "state": "MD",
  "street_address": "8120 Jumpers Hole Road"
}`;

const intForm = document.querySelector<HTMLFormElement>('#int-form')!;
const inputTemplate = document.querySelector<HTMLInputElement>('#int-template')!;
const intStr = document.querySelector<HTMLFormElement>('#int-string')!;
const intResult = document.querySelector<HTMLFormElement>('#int-result')!;
const clearResultBtns = document.querySelectorAll<HTMLFormElement>('.c_int__btn--clear')!;
const copyBtn = document.querySelector<HTMLFormElement>('.c_int__btn--copy')!;

copyBtn.disabled = true;

const formHandler = (event: SubmitEvent) => {
  event.preventDefault();
  intResult.value = interpolate(inputTemplate.value);
  checkForEmptyState();
};

const interpolate = (template: string) => {
  const templateObj = JSON.parse(template);
  const parsedInput = parseString(intStr.value);
  return `{
  "cc": "${templateObj.cc}",
  "city": "${parsedInput.city}",
  "country": "${parsedInput.country}",
  "formatted_address": "${parsedInput.formatted_address}",
  "formatted_city": "${parsedInput.formatted_city}",
  "postal_code": "${parsedInput.postal_code}",
  "state": "${parsedInput.state}",
  "street_address": "${parsedInput.street_address}"
}`;
};

const parseString = (str: string) => {
  const inputArr = str.split(',').map(item => item.trim());
  const inputSubArr = inputArr[2].split(' ');

  const street = inputArr[0];
  const city = inputArr[1];
  const state = inputSubArr[0];
  const postal = inputSubArr[1];
  const country = inputArr[3];

  return {
    city: city,
    country: country,
    formatted_address: `${street}, ${city}, ${state}, ${country}`,
    formatted_city: `${city}, ${state}, ${country}`,
    postal_code: postal,
    state: state,
    street_address: street,
  };
};

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(intResult.value);
    copyBtn.innerText = 'Done';
    console.log('Content copied to clipboard');
    console.info(`${intResult.value}`);
  } catch (err) {
    console.error('Failed to copy: ', err);
  } finally {
    setTimeout(() => {
      copyBtn.innerText = 'Copy';
    }, 1000);
  }
};

const clearInput = (event: MouseEvent) => {
  event.preventDefault();
  const inputId = (event.target as HTMLElement).attributes.getNamedItem('data-input')?.value;
  const input = inputId && document.getElementById(inputId);

  if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
    input.value = '';
    checkForEmptyState();
  }
};

function checkForEmptyState() {
  if (intResult.value.trim()) {
    copyBtn.disabled = false;
  } else {
    copyBtn.disabled = true;
  }
}

inputTemplate.value = TEMPLATE;
intForm.addEventListener('submit', formHandler);
copyBtn.addEventListener('click', copyContent);
clearResultBtns.forEach(btn => btn.addEventListener('click', clearInput));
intResult.addEventListener('input', checkForEmptyState);
