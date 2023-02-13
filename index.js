import chalk from 'chalk';
import child_process from 'child_process';
import fs from 'fs';
import { formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set } from 'date-fns';
import { Command } from 'commander';

const first = chalk.bgMagentaBright.bold('Annica');
const last = chalk.bold.yellow('Blixt');
const name = `${first} ${last}`
console.log(name);

const gitVersion = child_process.execSync('git --version').toString().trim();
const npmVersion = child_process.execSync('npm -v').toString().trim();
const nodeVersion = child_process.execSync('node -v').toString().trim();
console.log(gitVersion);
console.log('npm version', npmVersion);
console.log('node version',nodeVersion);

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const todaysDate = (format(new Date(), 'yyyy-MM-dd'));
const startofCourse = new Date(2023, 0, 31);
const dateStringSentAsArgument = argumentParser.args[0];
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})
console.log('Todays date:', todaysDate);
console.log('Days since start of course', formatDistanceToNow(startofCourse));
console.log('isToday', isToday(dateSentAsArgument));
console.log('isAfter', isAfter(dateSentAsArgument, currentDate));
console.log('isBefore', isBefore(dateSentAsArgument, currentDate));

const createIndexMdFile = () => {
  const fileContent = `Assignment-2
    
    My name: Annica Blixt
    
    Versions
    Git version: ${gitVersion}
    npm version: ${npmVersion}
    Node.js version: ${nodeVersion}
      
    Date Comparisoion
    Todays date: ${todaysDate};
    Your entered date: ${format(dateSentAsArgument, 'yyyy-MM-dd')}
    The date is today. ${isToday(dateSentAsArgument)}
    The date is before today. ${isBefore(dateSentAsArgument, currentDate)}
    The date is after today. ${isAfter(dateSentAsArgument, currentDate)}

    Days since course started: ${formatDistanceToNow(startofCourse)}
  `;
                                                                                                    
  fs.writeFileSync('index.md', fileContent);
}

const createHtmlFile = () => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          h1 {
            text-align: center;
            color: #9C3848;
          }
        </style>
      </head>
      <body>
        <h1>Assignment-2</h1>
      </body>
    </html>
  `;

  fs.writeFileSync('index.html', html);
};

createHtmlFile();
createIndexMdFile();




















  

