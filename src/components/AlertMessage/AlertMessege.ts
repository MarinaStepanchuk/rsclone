import './AlertMessege.scss';
import createElement from '../../utils/createElement';
import { ClassMap } from '../../constants/htmlConstants';
import { RESPONSE_STATUS } from '../../Api/serverConstants';

class AlertMessage {
  private alert: HTMLElement | null = null;

  private message: string;

  private status: number;

  constructor(messege: string, status: number) {
    this.message = messege;
    this.status = status;
    this.remove();
  }

  public render(): void {
    this.alert = createElement({
      tag: 'div',
      classList: [
        ClassMap.alertMessage.wrapper,
        (this.status === RESPONSE_STATUS.OK || this.status === RESPONSE_STATUS.CREATED)
          ? ClassMap.alertMessage.success : ClassMap.alertMessage.error,
      ],
      content: this.message,
    });

    document.body.append(this.alert);
  }

  public remove(): void {
    this.alert?.remove();
  }
}

export default AlertMessage;
