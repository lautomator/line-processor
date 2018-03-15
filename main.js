var lineProcessorApp = function () {
    "use strict";

    var model = {
        targets: data.targets,
        templates: data.templates,
        line: null,
        lineProcessed: [],
        words: 0,
        letters: 0,
        longestWordCount: 0,
        vowels: ["a", "e", "i", "o", "u"],
        mostVowels: {
            word: null,
            vowels: [],
            count: 0
        },
        numbers: 0
    };

    function setLine(uin) {
        // Sets the user input to
        // the model <str>. Takes
        // in the user input from
        // the text area <str>
        model.line = uin;
    }

    function setLineProcessed(uin) {
        // Sets the line split into
        // an array of substrings. Takes
        // in the user input stored in the
        // model <str>.
        if (uin !== null) {
            model.lineProcessed = uin.split(" ");
        }
    }

    function setWordCount(line) {
        model.words = line.length;
    }

    function getWordCount(line) {
        // Returns the number of
        // words <num>. Takes in
        // the line <array>.
        if (typeof line === "object") {
            return line.length;
        }
    }

    function setLettersCount(count) {
        model.letters = count;
    }

    function getLettersCount(line) {
        // Returns the number of
        // letters <num>. Takes in
        // the line <str>.
        var count = 0;
        var re = /[a-zA-Z]/;
        var index = 0;
        var len = line.length;

        while (index < len) {
            if (line[index].search(re) === 0) {
                count += 1;
            }
            index += 1;
        }
        return count;
    }

    function getWords(procLine) {
        // Takes in the processed
        // line <array>. Removes
        // anything that is not a
        // letter. Returns the
        // line with words only <array>.
        var words = [];
        var index = 0;
        var strIndex = 0;
        var len = procLine.length;
        var re = /[a-zA-Z]/;
        var temp = "";

        while (index < len) {
            // the entire array
            while (strIndex < procLine[index].length) {
                if ( procLine[index][strIndex].search(re) === 0) {
                    temp += procLine[index][strIndex];
                }
                strIndex += 1;
            }
            words.push(temp);
            temp = "";
            strIndex = 0;
            index += 1;
        }
        return words;
    }

    function setLongest(l) {
        model.longestWordCount = l;
    }

    function getLongestWord(words) {
        // Returns the count of the
        // longest word in use <num>,
        // could be many. Takes in
        // an array of words from
        // the original line of words.
        var longest = 0;
        var counts = [];
        var index = 0;
        var len = words.length;

        while (index < len) {
            counts.push(words[index].length);
            index += 1;
        }

        counts.sort(function(a, b){ return a - b });
        longest = counts[counts.length - 1];

        return longest;
    }

    function setMostVowels(result) {
        // Takes in the result from the
        // vowel search query <obj>.
        model.mostVowels.word = result.word;
        model.mostVowels.vowels = result.vowels;
        model.mostVowels.count = result.count;
    }

    function getWordWithMostVowels(words, vowels) {
        // Returns a word with the most
        // vowels, the count, and the
        // vowels used <obj>. Takes in
        // the words and vowels <arrays>.
        var mostVowels = {
            word: null,
            vowels: [],
            count: 0
        };
        var index = 0;
        var count = 0;
        var len = words.length;
        var results = [];
        var hasVowels = "";
        var maxVowels = {
            vowels: null,
            index: null,
            len: 0
        }

        while (index < len) {
            while (count < words[index].length) {
                // check for vowels
                if (vowels.indexOf(words[index][count]) > -1) {
                    // the word has a vowel
                    hasVowels += vowels[vowels.indexOf(words[index][count])];
                }
                count += 1;
            }

            results[index] = hasVowels;

            // resets
            hasVowels = "";
            count = 0;
            index += 1;
        }

        // get the index with the most vowels
        index = 0;
        while (index < results.length) {
            if (results[index].length > maxVowels.len) {
                maxVowels.vowels = results[index];
                maxVowels.index = index;
                maxVowels.len = results[index].length;
            }
            index += 1;
        }

        // set the results
        if (maxVowels.index !== null) {
            mostVowels.word = words[maxVowels.index];
            mostVowels.vowels = maxVowels.vowels;
            mostVowels.count = maxVowels.len;
        }

        return mostVowels;
    }

    // view
    function render(m) {
        var template = m.templates[0];
        var dataEl = m.targets.results[0];
        var html = "";

        // data
        html = template.replace("%header%", "words:");
        html = html.replace("%data%", m.words.toString());
        html += template.replace("%header%", "letters:");
        html = html.replace("%data%", m.letters.toString());
        html += template.replace("%header%", "length of longest word:");
        html = html.replace("%data%", m.longestWordCount.toString());
        html += template.replace("%header%", "greatest number of vowels:");
        html = html.replace("%data%", (m.mostVowels.count.toString() + "/" + m.mostVowels.word + "(" + m.mostVowels.vowels + ")"));

        dataEl.innerHTML = html;
    }

    function init() {
        var wordsOnly = null;
        var longest = 0;
        setLine(model.targets.lineIn.value.trim());
        setLineProcessed(model.line);
        setWordCount(model.lineProcessed);
        setLettersCount(getLettersCount(model.line));
        wordsOnly = getWords(model.lineProcessed);
        longest = getLongestWord(wordsOnly);
        setLongest(longest);
        setMostVowels(getWordWithMostVowels(wordsOnly, model.vowels));

        render(model);
        console.log(model);
    }

    model.targets.process.addEventListener("click", function () {
        init();
    }, false);

    init();
};
lineProcessorApp(data);