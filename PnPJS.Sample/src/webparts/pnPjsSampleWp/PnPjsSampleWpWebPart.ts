import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import {  IPropertyPaneConfiguration,  PropertyPaneTextField} from '@microsoft/sp-property-pane';

import { spfi, SPFI, SPFx } from "@pnp/sp"; // Import PnPJS
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import * as strings from 'PnPjsSampleWpWebPartStrings';

import styles from './PnPjsSampleWpWebPart.module.scss';

export interface IPnPjsSampleWpWebPartProps {
  description: string;
}

export interface ISPListItem {
  Title: string;
  Id: number;
}

export default class PnPjsSampleWpWebPart extends BaseClientSideWebPart<IPnPjsSampleWpWebPartProps> {

  private sp: SPFI; // PnPJS sp object

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${ styles.pnPjsSampleWp }">
    <div id="spListContainer"></div>
      <div>
        <input type="text" id="itemTitle" placeholder="Item Title"/>
        <button type="button" id="addItemButton">Add Item</button>
      </div>
    </div>
    `;

    this.readItems();
    this.setButtonEventHandlers();
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.sp = spfi().using(SPFx(this.context)); // Initialize PnPJS with the context
  }

  private async readItems(): Promise<void> {
    try {
      const items: ISPListItem[] = await this.sp.web.lists.getByTitle("list11").items.select("Title", "Id")();
      this.renderItems(items);
    } catch (error) {
      console.error(error);
    }
  }

  private renderItems(items: ISPListItem[]): void {
    let html: string = '<ul>';
    items.forEach((item) => {
      html += `<li>${item.Title} (ID: ${item.Id})</li>`;
    });
    html += '</ul>';
    const listContainer: HTMLElement | null = this.domElement.querySelector('#spListContainer');
    if (listContainer) {
      listContainer.innerHTML = html;
    }
  }

  private setButtonEventHandlers(): void {
    const addButton: HTMLElement | null = this.domElement.querySelector('#addItemButton');
    if (addButton) {
      addButton.addEventListener('click', () => this.addItem());
    }
  }

  private async addItem(): Promise<void> {
    const itemTitleElement = this.domElement.querySelector('#itemTitle') as HTMLInputElement | null;
    if (!itemTitleElement || !itemTitleElement.value) {
      alert('Please enter a title for the item.');
      return;
    }

    const itemTitle: string = itemTitleElement.value;

    try {
      await this.sp.web.lists.getByTitle("list11").items.add({
        Title: itemTitle
      });
      alert('Item added successfully');
      this.readItems(); // Refresh the list items
    } catch (error) {
      console.error(error);
      alert('Error adding item: ' + error.message);
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
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
