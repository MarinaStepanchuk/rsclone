import './Account.scss';

class Account {
  public render(): void {
    const p = document.createElement('p');
    p.innerText = 'Я страница профиля';
    document.body.replaceChildren(p);
  }
}

export default Account;
