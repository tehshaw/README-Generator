import inquirer from "inquirer";
import fs from "fs";
import { createMarkdown, generateLicense } from './utils/generateMarkdown.js';


const mainQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter your full name",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'title',
        message: "Enter a title for your project",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter a description for your project",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'install',
        message: "Enter the installation instructions for your project",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: "Enter the usage information for your project",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'guidelines',
        message: "Enter the contribution guidelines for your project",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'test',
        message: "Enter test instructions for your project",
        validate(value) {
            const valid = isNaN(value);
            return valid || "Answer can not be blank."
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter your github username",
        default: "Project Title",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter your email address for the project",
        default: "Project Title",
    },
];

const licenseQuestions = [

    {
        type: 'list',
        name: 'license',
        message: "Choose a license for your project",
        choices: ["MIT License","GNU AGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "None"],
        filter: async (answer) => {
            return answer !== "None" ? "Licensed under " + answer : "This project has no license"

        }
        
    },
    {
        type: "confirm",
        name: "noLicense",
        message: "Are you sure you want to ommit a license?",
        when(answers){
            return answers.license === "This project has no license"
        }
    }

];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) throw err;
        console.log("The file has been saved");
    })

}

// TODO: Create a function to initialize app
async function init() {
    console.log("Welcome to the README generator.\nPlease follow the prompts to proceed.\n");
    
    const allAnswers = await askQuestions(mainQuestions);
    let markdown = createMarkdown(allAnswers);
    writeToFile("./write_file/README.md", markdown);
}

async function getLicenseInfo(answers){
    let licAnswers;
    try{
        licAnswers = await inquirer.prompt(licenseQuestions)
        switch (licAnswers.noLicense) {
            case false:
                licAnswers = await getLicenseInfo(answers);
                break;
            case true:
                console.log("Confirmed, no license selected.");
            default:
                return ({...answers, ...licAnswers});
        }
    }
    catch(error){
        console.log(error);
    }
    finally{
        return ({...answers, ...licAnswers});
    }

}


async function askQuestions(questions){
    let answers;
    try{
        answers = await inquirer.prompt(questions)     

    }
    catch(error){
        console.log(error);
    }
    finally{
        
        return getLicenseInfo(answers)
    }
    
}

// Function call to initialize app
init();
