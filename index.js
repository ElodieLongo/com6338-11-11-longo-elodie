const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poemData) => {
  const data = poemData[0];

  const title = makeTag('h2')(data.title);
  const author = pipe(makeTag('em'), makeTag('h3'))('by ' + data.author);
  const linesArr = getSplittedArray(data.lines, "").map(arr => {
    let str = arr.map((str, i) => {
      if (i === arr.length - 1) {
        return str;
      }
      return str + '<br />'
    })
    return makeTag('p')(str.join(''))
  });
  return title + author + linesArr.join('');
}


function getSplittedArray(arr, aSep) {
  const acc = [[]];
  const sp = () => {
      for (let i = 0; i < arr.length; i++){
          const item = arr[i];
          const last = acc[acc.length - 1];
          
          if (aSep.indexOf(item) > -1){
              acc.push([]);
          }else{
              last.push(item);
          }
      };
  };
  sp();
  
  return acc;
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}

