# PnPJS.Sample

## Overview

The PnPJS.Sample project demonstrates how to use PnPjs within a SharePoint Framework (SPFx) web part. PnPjs is a collection of JavaScript libraries designed to simplify working with SharePoint REST APIs. This sample provides a basic example of how to leverage PnPjs to interact with SharePoint data.

## Features

- **Add item**: Add new item to list - list1.
- **Show existing list items**: Show items from list - list1.


## Prerequisites

Before you begin, ensure you have met the following requirements:

- SharePoint Online subscription.
- Node.js LTS version 18.x or higher.
- SharePoint Framework (SPFx) development environment [set up](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment).

## Getting Started

Follow these instructions to set up and run the PnPJS.Sample project.

### Installation

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/himani-chi/SPFxWebparts.git

2. **Navigate to the project directory**

   ```bash
   cd SPFxWebparts       
  
3. **Install dependencies:**

   ```bash
   npm install
   
4. **Serve the solution locally:**

   ```bash
   gulp serve

 This command opens the SharePoint workbench, allowing you to test the web part locally.

 ## Deployment

 1. **Bundle the Solution:**

      Prepare the project for deployment by bundling the assets. This command prepares and optimizes the project files for production.

    ```bash
    gulp bundle --ship
       
 3. **Package the Solution:**

     Create a SharePoint package (.sppkg) file. This step generates a package in the sharepoint/solution folder that you can deploy to your SharePoint App Catalog.
 
    ```bash
    gulp package-solution --ship  
 
 5. **Upload and Deploy the Package:**
    - Go to your SharePoint Online App Catalog site.
    - Upload the .sppkg file from the sharepoint/solution directory to the 'Apps for SharePoint' library.
    - Deploy the package by clicking the "Deploy" button when prompted.


  ## Contributing
  
  Contributions to the Project are welcome! If you would like to contribute, please:

  - Fork the repository.
  - Create a feature branch: `git checkout -b my-new-feature`
  - Commit your changes: `git commit -am 'Add some feature`
  - Push to the branch: `git push origin my-new-feature`
  - Submit a pull request.


## License

This project is licensed under the MIT License - see the LICENSE file for details.


## Support

If you encounter any problems or have suggestions, please [open an issue](https://github.com/himani-chi/SPFxWebparts.git/issues) on GitHub. Community support and contributions are highly appreciated!


## Acknowledgments

- Thanks to the SharePoint Framework Community for guidance and support.
- [Microsoft Documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page) for detailed setup and deployment instructions.
