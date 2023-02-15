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
      
    Date Comparison
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
    <head> </head>
    <body>
      <h1>Assignment-2</h1>
      <section>
        <h3>Versions</h3>
        <p><b>Git version:</b> ${gitVersion}</p>
        <p><b>npm version:</b> ${npmVersion}</p>
        <p><b>Node.js version:</b> ${nodeVersion}</p>
      </section>
      <section>
        <h3>Date Comparison</h3>
        <p><b>Todays date:</b> ${todaysDate}</p>
        <p><b>You entered date:</b> ${format(dateSentAsArgument, 'yyyy-MM-dd')}</p>
        <p><b>Date is today:</b> ${isToday(dateSentAsArgument)}</p>
        <p><b>The date is before today.</b> ${isBefore(dateSentAsArgument, currentDate)}</p>
        <p><b>The date is after today.</b> ${isAfter(dateSentAsArgument, currentDate)}</p>
        <p><b>Days since course started:</b> ${formatDistanceToNow(startofCourse)}</p>
      </section>
      
      <style>
        body {
          background: #8DAA91;
        }
        h1, h3, p {
          color: #453643;
          font-family: 'Lato', sans-serif;
          text-align: center;
        }
        section {
          background: #788475;
          border-radius: 20%;
          margin: 0 20px 10px 20px;
          padding: 10px;
        }
      </style>

    </body>
  </html>
  `;

  fs.writeFileSync('index.html', html);
};

createHtmlFile();
createIndexMdFile();




















  

