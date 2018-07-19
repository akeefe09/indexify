// sample input:

// [
//     {
//       "title": "object 1",
//       "index": "1"
//     },
//     {
//       "title": "object 2",
//       "index": "1.1"
//     },
//     {
//       "title": "object 3",
//       "index": "1.1.1"
//     },
//     {
//       "title": "object 4",
//       "index": "2"
//     },
//     {
//       "title": "object 5",
//       "index": "2.1"
//     },
//   ]


// sample output:

//   [
//     {
//       "title": "object 1",
//       "index": "1",
//       "sub-sections": [
//         {
//           "title": "object 2",
//           "index": "1.1"
//           "sub-sections": [
//             {
//               "title": "object 3",
//               "index": "1.1.1"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "title": "object 4",
//       "index": "2",
//       "sub-sections": [
//         {
//           "title": "object 5",
//           "index": "2.1"
//         }
//       ]
//     }
//   ]


function indexify(data) {
  let result1 = []; // this array will have all objects with
          // a two-digit index pushed in

  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    if (current["index"].length === 3) {
      result1.push(current); // checks if it's a "1.1" style index, populates the array
    }
  }

  for (let j = 0; j < data.length; j++) {
    let current2 = data[j];

    if (current2["index"].length === 5) { // checking for all "1.1.1" style index
      let firstPart = current2["index"].slice(0, 3); // used to check if the first two digits match

      for (let x = 0; x < result1.length; x++) {
        let idx = result1[x]["index"];
        if (idx === firstPart) { // checks the first two digits
          if (result1[x]["contents"] ===  undefined) {
            result1[x]["contents"] = []; // if that object hasn't had a "contents" array
          }                   // created yet, make it
          result1[x]["contents"].push(current2); // then push it in
        }
      } // the result1 array is now in the correct format for all 2 and 3 digit indices
    }
  }

  let result2 = []; // creating the base array with single-digit indices

  for (let z = 0; z < data.length; z++) {
    if (data[z]["index"].length === 1) {
      result2.push(data[z]); // populates the base array
    }
  }

  for (let b = 0; b < result2.length; b++) {
    result2[b]["contents"] = []; // adds an empty "contents" array
  }

  for (let y = 0; y < result2.length; y++) {
    for (let a = 0; a < result1.length; a++) { // this section of code checks for matching indices
      if (result2[y]["index"] === result1[a]["index"].slice(0,1)) { // in the base array and the
        result2[y]["contents"].push(result1[a]);              // already nested array
      }   // then pushes the nested sections into the base array
    }
  }

  return result2;
}

let tableOC =   [
    {
      "title": "object 1",
      "index": "1"
    },
    {
      "title": "object 2",
      "index": "1.1"
    },
    {
      "title": "object 3",
      "index": "1.1.1"
    },
    {
      "title": "object 4",
      "index": "2"
    },
    {
      "title": "object 5",
      "index": "2.1"
    },
    {
      "title": "object 6",
      "index": "2.1.3"
    }
  ];

  console.log(JSON.stringify(indexify(tableOC)));
