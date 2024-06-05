import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { 
  IPropertyPaneConfiguration, 
  PropertyPaneDropdown 
} from '@microsoft/sp-property-pane';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import styles from './RestSampleWpWebPart.module.scss';

export interface IRestSampleWpWebPartProps {
  listName: string;
}

export interface ISPListItem {
  Title: string;
  Id: number;
}

export default class RestSampleWpWebPart extends BaseClientSideWebPart<IRestSampleWpWebPartProps> {
  private listsDropdownOptions: { key: string, text: string }[] = [];

  public async onInit(): Promise<void> {
    await super.onInit();
    this.listsDropdownOptions = await this.fetchLists();
    this.context.propertyPane.refresh();
  }

  private async fetchLists(): Promise<{ key: string, text: string }[]> {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false and BaseTemplate eq 100`,
        SPHttpClient.configurations.v1
      );
      const lists: { value: { Title: string }[] } = await response.json();
      return lists.value.map(list => ({ key: list.Title, text: list.Title }));
    } catch (error) {
      console.error('Failed to fetch lists', error);
      return [];
    }
  }

  public async getWebTitle(): Promise<string> {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web?$select=Title`,
        SPHttpClient.configurations.v1
      );
      const web: { Title: string } = await response.json();
      return web.Title;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch web title");
    }
  }

  public async getListItems(listName: string): Promise<ISPListItem[]> {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id`,
        SPHttpClient.configurations.v1
      );
      const listItems: { value: ISPListItem[] } = await response.json();
      return listItems.value;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch list items");
    }
  }

  public async render(): Promise<void> {
    if (!this.properties.listName) {
      this.domElement.innerHTML = `
        <div class="${styles.restSampleWp}">
          <div class="${styles.container}">
            <div class="${styles.row}">
              <div class="${styles.column}">
                <span class="${styles.title}">Please configure the web part.</span>
              </div>
            </div>
          </div>
        </div>`;
      return;
    }

    try {
      const webTitle: string = await this.getWebTitle();
      const items: ISPListItem[] = await this.getListItems(this.properties.listName);

      let itemsHtml = '';
      items.forEach((item) => {
        itemsHtml += `<li>${item.Title} (ID: ${item.Id})</li>`;
      });

      this.domElement.innerHTML = `
        <div class="${styles.restSampleWp}">
          <div class="${styles.container}">
            <div class="${styles.row}">
              <div class="${styles.column}">
                <span class="${styles.title}">Web Title: ${webTitle}</span>
                <ul>${itemsHtml}</ul>
              </div>
            </div>
          </div>
        </div>`;
    } catch (error) {
      console.error(error);
      this.domElement.innerHTML = `
        <div class="${styles.restSampleWp}">
          <div class="${styles.container}">
            <div class="${styles.row}">
              <div class="${styles.column}">
                <span class="${styles.title}">Error loading data</span>
              </div>
            </div>
          </div>
        </div>`;
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure your web part'
          },
          groups: [
            {
              groupName: 'General Settings',
              groupFields: [
                PropertyPaneDropdown('listName', {
                  label: 'Select a list',
                  options: this.listsDropdownOptions,
                  disabled: this.listsDropdownOptions.length === 0
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
