// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let badgeID;

  switch (license){
    case "Licensed under MIT License": badgeID = "MIT"; break;
    case "Licensed under GNU AGPLv3": badgeID = "GNU"; break;
    
    case "Licensed under Mozilla Public License 2.0": badgeID = "Mozilla 2.0"; break;

    case "Licensed under Apache License 2.0": badgeID = "Apache 2.0"; break;
    
    case "None":
      return "";
  }

    return "https://img.shields.io/badge/license-" + badgeID + "-brightgreen;"

}

  


// TODO: Create a function to generate markdown for README
const createMarkdown = function (data) {
  let licenseBadge = renderLicenseBadge(data.license)
  let markdown = 
  `
  # ${data.title}

  ![License Badge](${licenseBadge})
  
  ## Description
  
  ${data.description}
  
  ## Table of Conetents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#Contribute)
  - [Tests](#tests)
  - [Questions](#questions)
  - [License](#license)
  
  ## Installation
  
  ${data.install}
  
  ## Usage
  
  ${data.usage}
  
  ## Contribute
  
  ${data.guidelines}
  
  ## Tests
  
  ${data.test}
  
  ## Questions
  
  Please contact me on [GitHub](https://github.com/${data.github}) or via email ${data.email}.
  
  ## License
  
  [${data.license}](./LICENSE.txt)
  
`
return markdown;

}

function generateLicense(data) {

  //TODO add license strings based on what license is selected
  return `
    

`;
}


export { createMarkdown, generateLicense }

