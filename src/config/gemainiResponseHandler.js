export default function geminiResponseHandler(data) {
  let regex = /^\d+/; // start with a number
  const response = data.split("\n\n");
  let returnData = "";
  let codePending = false;
  let subCodePending = false;
  for (let i = 0; i < response.length; i++) {
    // start with "**"
    if (
      response[i][0] === "`" &&
      response[i][1] === "`" &&
      response[i][0] === "`"
    ) {
      const heading = response[i].slice(3, response[i].indexOf("\n"));
      if (
        response[i][response[i].length - 1] === "`" &&
        response[i][response[i].length - 2] === "`" &&
        response[i][response[i].length - 3] === "`"
      ) {
        const constentStart = response[i].indexOf("\n") + 1;
        const contentEnd = response[i].length - 3;
        let content = response[i].slice(constentStart, contentEnd);
        if (heading === "html" || heading === "jsx") {
          content = content.replace(/</g, "&lt;");
        }
        returnData += `<div class="code-copy-container"><div class="code-container">${
          heading && "<div class='code-heading'>" + heading + "</div>"
        }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
          heading && "language-" + heading
        }"><code>${content}</code></pre></div></div><div class="copy-container"><p><span>Use code </span><span class="copy-text">with caution</span></p><div><button   class="copy-btn"><img class="copy-btn-img" src="/copy.svg" alt="Copy Icon" /></button></div></div></div>`;
        //
      } else {
        const constentStart = response[i].indexOf("\n") + 1;
        let content = response[i].slice(constentStart, response[i].length);
        if (heading === "html" || heading === "jsx") {
          content = content.replace(/</g, "&lt;");
        }

        returnData += `<div class="code-copy-container"><div class="code-container">${
          heading && "<div class='code-heading'>" + heading + "</div>"
        }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
          heading && "language-" + heading
        }"><code>${content}`;
        codePending = heading || true;
      }
    } else if (codePending) {
      if (
        response[i][response[i].length - 1] === "`" &&
        response[i][response[i].length - 2] === "`" &&
        response[i][response[i].length - 3] === "`"
      ) {
        let content = response[i].slice(0, response[i].length - 3);
        if (codePending === "html" || codePending === "jsx") {
          content = content.replace(/</g, "&lt;");
        }
        returnData += `<br /><br />${content}</code></pre></div></div><div class="copy-container"><p><span>Use code </span><span class="copy-text">with caution</span></p><div><button class="copy-btn"><img class="copy-btn-img" src="/copy.svg" alt="Copy Icon" /></button></div></div></div>`;
        codePending = false;
      } else {
        returnData += `<br /><br />${response[i]}`;
      }
    } else if (regex.test(response[i])) {
      if (response[i].indexOf("```") !== -1) {
        const item = response[i];
        const number = item.split(".")[0].trim();
        const heading = item.match(/\*\*(.*?)\*\*/)[1];
        const language = item.match(/\((.*?)\)/)[1];
        let code = item.match(/```(?:.*?)\n([\s\S]*?)\n```/)[1];
        if (language === "html" || language === "jsx") {
          code = code.replace(/</g, "&lt;");
        }
        returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading-paragraph">${number}. </p> <p class="sub-heading">${heading} </p></div><div class="code-copy-container"><div class="code-container">${
          language && "<div class='code-heading'>" + language + "</div>"
        }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
          language && "language-" + language
        }"><code>${code}</code></pre></div></div><div class="copy-container"><p><span>Use code </span><span class="copy-text">with caution</span></p><div><button  class="copy-btn"><img class="copy-btn-img" src="/copy.svg" alt="Copy Icon" /></button></div></div></div>`;
      } else {
        if (response[i].indexOf("**") !== -1) {
          const steps = response[i].split("\n");
          for (let j = 0; j < steps.length; j++) {
            const step = steps[j].split("**");
            const number = step[0];
            const heading = step[1];
            const content = step[2].trim();
            returnData += `<div class="sub-heading-paragraph-cont">
                        <p class="sub-heading-paragraph">${number}</p>
                        <p class="sub-heading">${heading}</p>
                        <p class="sub-heading-paragraph">${content}</p>
                    </div>`;
          }
        } else {
          const steps = response[i].split("\n");
          for (let j = 0; j < steps.length; j++) {
            const [number, value] = steps[j].split(". ");
            returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading">${number}. </p><p class="sub-heading-paragraph">${value}</p></div>`;
          }
        }
      }
      (".......");
    } else if (subCodePending) {
      const newRes = response[i].split("```\n");
      for (let j = 0; j < newRes.length; j++) {
        if (newRes.indexOf(newRes[j]) !== newRes.length - 1) {
          newRes[j] = newRes[j] + "```";
        }

        if (newRes.indexOf(newRes[j]) === 0) {
          let code = newRes[j].slice(0, newRes[j].indexOf("```"));
          if (subCodePending === "html" || subCodePending === "jsx") {
            code = code.replace(/</g, "&lt;");
          }

          returnData += `<br /><br />${code}</code></pre></div></div><div class="copy-container"><p><span>Use code </span><span class="copy-text">with caution</span></p><div><button  class="copy-btn"><img class="copy-btn-img" src="/copy.svg" alt="Copy Icon" /></button></div></div></div>`;

          subCodePending = false;
        } else if (newRes[j][newRes[j].length - 1] === "`") {
          const headingMatch = newRes[j].match(/^\*\s*(.*):\n/);
          const heading = headingMatch ? headingMatch[1] : "";

          // Extract language
          const languageMatch = newRes[j].match(/```(\w+)/);
          const language = languageMatch ? languageMatch[1] : "";

          // Extract code content
          const codeContentMatch = newRes[j].match(/```(?:\w+)\n([\s\S]+?)```/);
          let code = codeContentMatch ? codeContentMatch[1] : "";
          if (language === "html" || language === "jsx") {
            code = code.replace(/</g, "&lt;");
          }

          returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading-paragraph">${heading}</p></div><div class="code-copy-container"><div class="code-container">${
            language && "<div class='code-heading'>" + language + "</div>"
          }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
            language && "language-" + language
          }"><code>${code}</code></pre></div></div><div class="copy-container"><p><span>Use code </span><span class="copy-text">with caution</span></p><div><button  class="copy-btn"><img class="copy-btn-img" src="/copy.svg" alt="Copy Icon" /></button></div></div></div>`;
        } else {
          // Extract heading
          const headingMatch = newRes[j].match(/^\*\s*(.*):\n/);
          const heading = headingMatch ? headingMatch[1] : "";

          const languageMatch = newRes[j].match(/```(\w+)/);
          const language = languageMatch ? languageMatch[1] : "";

          const codeContentMatch = newRes[j].match(/```(?:\w+)\n([\s\S]+?)```/);
          let code = codeContentMatch ? codeContentMatch[1] : "";
          if (language === "html" || language === "jsx") {
            code = code.replace(/</g, "&lt;");
          }

          returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading-paragraph">${heading}</p></div><div class="code-copy-container"><div class="code-container">${
            language && "<div class='code-heading'>" + language + "</div>"
          }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
            language && "language-" + language
          }"><code>${code}`;

          subCodePending = language || true;
        }
      }

      //
    } else if (
      response[i].indexOf("```") !== -1 &&
      response[i][0] === "*" &&
      response[i][2] !== "*" &&
      response[i][3] !== "*"
    ) {
      const newRes = response[i].split("```\n");
      for (let j = 0; j < newRes.length; j++) {
        if (newRes.indexOf(newRes[j]) !== newRes.length - 1) {
          newRes[j] = newRes[j] + "```";
        }

        if (newRes[j][newRes[j].length - 1] === "`") {
          const headingMatch = newRes[j].match(/^\*\s*(.*):\n/);
          const heading = headingMatch ? headingMatch[1] : "";

          const languageMatch = newRes[j].match(/```(\w+)/);
          const language = languageMatch ? languageMatch[1] : "";

          const codeContentMatch = newRes[j].match(/```(?:\w+)\n([\s\S]+?)```/);
          let code = codeContentMatch ? codeContentMatch[1] : "";
          if (language === "html" || language === "jsx") {
            code = code.replace(/</g, "&lt;");
          }

          returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading-paragraph">${heading}</p></div><div class="code-copy-container"><div class="code-container">${
            language && "<div class='code-heading'>" + language + "</div>"
          }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
            language && "language-" + language
          }"><code>${code}</code></pre></div></div><div class="copy-container"><p><span>Use code </span><span class="copy-text">with caution</span></p><div><button  class="copy-btn"><img class="copy-btn-img" src="/copy.svg" alt="Copy Icon" /></button></div></div></div>`;
        } else {
          const headingMatch = newRes[j].match(/^\*\s*(.*):\n/);
          const heading = headingMatch ? headingMatch[1] : "";

          const languageMatch = newRes[j].match(/```(\w+)/);
          const language = languageMatch ? languageMatch[1] : "";

          let code = newRes[j].slice(
            newRes[j].indexOf("```") + 3 + language.length + 1,
            newRes[j].length
          );
          if (language === "html" || language === "jsx") {
            code = code.replace(/</g, "&lt;");
          }

          returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading-paragraph">${heading}</p></div><div class="code-copy-container"><div class="code-container">${
            language && "<div class='code-heading'>" + language + "</div>"
          }<div class="pre-code-container custom-horizontal-scrollbar"><pre class="${
            language && "language-" + language
          }"><code>${code}`;

          subCodePending = language || true;
        }
      }
      //
    } else {
      response[i] = response[i].replace(
        /`([^`]+)`/g,
        "<span class='tick'>$1</span>"
      );

      if (response[i][0] === "*" && response[i][1] === "*") {
        // end with "** ... **"
        if (
          response[i][response[i].length - 1] === "*" &&
          response[i][response[i].length - 2] === "*"
        ) {
          if (response[0] === response[i]) {
            const head = response[i].slice(2, response[i].length - 2);
            returnData += `<p class="heading1"><span class="heading-content">${head}</span></p>`;
          } else {
            const head = response[i].slice(2, response[i].length - 2);
            returnData += `<p class="heading"><span class="heading-content">${head}</span></p>`;
          }
          // "**...**..."
        } else {
          const newRes = response[i].split("\n");
          for (let j = 0; j < newRes.length; j++) {
            if (newRes[j][0] === "*" && newRes[j][1] === "*") {
              if (
                newRes[j][newRes[j].length - 1] === "*" &&
                newRes[j][newRes[j].length - 2] === "*"
              ) {
                const result = newRes[j].slice(2, newRes[j].length - 2);
                returnData += `<p class="heading"><span class="heading-content">${result}</span></p>`;
              } else if (
                newRes[j][newRes[j].length - 1] !== "*" &&
                newRes[j][newRes[j].length - 2] !== "*"
              ) {
                const result1 = newRes[j].slice(2, newRes[j].indexOf("**", 2));
                const result2 = newRes[j].slice(
                  newRes[j].indexOf("**", 3) + 2,
                  newRes[j].length
                );
                returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading">${result1}</p> <p class="sub-heading-paragraph">${result2}</p></div>`;
              }
            } else if (newRes[j][0] === "*") {
              const result = newRes[j].slice(1, newRes[j].length);
              returnData += `<div class="list-item-container"><div class="list-item-logo-container"><div class="list-item-logo"></div></div><p class="list-item">${result}</p></div>`;
            }
          } // loop end
        }
        // "* **..."
      } else if (
        response[i][0] === "*" &&
        response[i][2] === "*" &&
        response[i][3] === "*"
      ) {
        const newRes = response[i].split("\n");
        for (let j = 0; j < newRes.length; j++) {
          // "* **..."
          if (
            newRes[j][0] === "*" &&
            newRes[j][2] === "*" &&
            newRes[j][3] === "*"
          ) {
            // "* **.... !*"
            if (newRes[j][newRes[j].length - 1] !== "*") {
              const result1 = newRes[j].slice(4, newRes[j].indexOf("**", 5));
              const result2 = newRes[j].slice(
                newRes[j].indexOf("**", 5) + 2,
                newRes[j].length
              );
              returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading">${result1}</p> <p class="sub-heading-paragraph">${result2}</p></div>`;
              // "* **...**"
            } else if (
              newRes[j][newRes[j].length - 1] === "*" &&
              newRes[j][newRes[j].length - 2] === "*"
            ) {
              const result = newRes[j].slice(4, newRes[j].length - 2);
              returnData += `<div class="sub-heading-paragraph-cont"><p class="sub-heading">${result}</p></div>`;
            }
            //    "    * ...."
          } else if (
            newRes[j][0] === " " &&
            newRes[j][1] === " " &&
            newRes[j][2] === " "
          ) {
            const result = newRes[j].trim().replace(/^\*\s*/, "");
            returnData += `<div class="sub-list-container"><div class="list-item-container"><div class="list-item-logo-container"><div class="list-item-logo"></div></div><p class="list-item">${result}</p></div></div>`;
          }
        } // for j end
        // "-...."
      } else if (response[i][0] === "-") {
        const items = response[i].split("\n");
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          if (item.startsWith(" ")) {
            // Sub-list items
            const result = item.trim().replace(/^\s*-\s*/, "");
            returnData += `<div class="sub-list-item-container">
                                  <div class="list-item-logo-container"><div class="list-item-logo"></div></div>
                                  <p class="list-item">${result}</p>
                             </div>`;
          } else {
            // Main list items
            const result = item.trim().replace(/^\s*-\s*/, "");
            if (result) {
              returnData += `<div class="list-item-container">
                                      <div class="list-item-logo-container"><div class="list-item-logo"></div></div>
                                      <p class="list-item">${result}</p>
                                 </div>`;
            }
          }
        }
        // "*......."
      } else if (
        response[i][0] === "*" &&
        response[i][2] !== "*" &&
        response[i][3] !== "*"
      ) {
        const newRes = response[i].split("\n");
        for (let j = 0; j < newRes.length; j++) {
          const result = newRes[j].slice(1, newRes[j].length);
          returnData += `<div class="list-item-container"><div class="list-item-logo-container"><div class="list-item-logo"></div></div><p class="list-item">${result}</p></div>`;
        }
        // "1....\n2...."
      } else {
        returnData += `<p class="list-item">${response[i]}</p>`;
      }
    }
  }

  return returnData;
}
