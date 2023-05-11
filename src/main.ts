import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="c_url">
  <form class="c_url__form" id="url-concat">
    <fieldset class="c_url__group">
      <label class="c_url__label" for="localhost">localhost name</label>
      <input class="c_url__input" type="text" id="localhost" name="localhost" value="localhost" required />
    </fieldset>

    <fieldset class="c_url__group">
      <label class="c_url__label" for="port">port</label>
      <input class="c_url__input" type="text" id="port" name="port" value="4200" required />
    </fieldset>

    <fieldset class="c_url__group">
      <label class="c_url__label" for="providerId">providerId</label>
      <input class="c_url__input" type="text" id="providerId" name="providerId" required />
    </fieldset>

    <fieldset class="c_url__group">
      <label class="c_url__label" for="token">auth-token</label>
      <input class="c_url__input" type="text" id="token" name="token" required />
    </fieldset>

    <fieldset class="c_url__group c_url__group--submit">
      <button class="c_url__btn c_url__btn--submit" aria-label="submit" type="submit">Concat</button>
    </fieldset>

    <fieldset class="c_url__group">
      <label class="c_url__label" for="result">result</label>
      <input class="c_url__input" type="text" id="result" name="result" />
    </fieldset>

    <fieldset class="c_url__group c_url__group--actions">
      <button class="c_url__btn c_url__btn--action" aria-label="copy-to-clipboard" type="button" id="copy">
        Copy to clipboard
      </button>
      <button class="c_url__btn c_url__btn--action" aria-label="open" type="button" id="open">Open in new tab</button>
    </fieldset>
  </form>
</div>
`;

const inputResult = document.querySelector<HTMLInputElement>('#result')!;
const form = document.querySelector<HTMLFormElement>('#url-concat')!;
const btnCopy = document.querySelector<HTMLFormElement>('#copy')!;
const btnOpen = document.querySelector<HTMLFormElement>('#open')!;

let resultUrl: string;

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
  }
};

const openInNewTab = () => {
  if (!resultUrl) return;

  window.open(resultUrl, '_blank');
};

form.addEventListener('submit', formHandler);
btnCopy.addEventListener('click', copyContent);
btnOpen.addEventListener('click', openInNewTab);
