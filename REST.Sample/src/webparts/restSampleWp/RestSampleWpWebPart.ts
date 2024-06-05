import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import styles from './RestSampleWpWebPart.module.scss';

export interface IRestSampleWpWebPartProps {
}

export default class RestSampleWpWebPart extends BaseClientSideWebPart<IRestSampleWpWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${ styles.restSampleWp }"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
