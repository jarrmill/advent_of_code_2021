const helper_elf = require('./helper_elf');

const check_depths = function (fileName, delimiter = '\n') {
  helper_elf.readFile(fileName)
    .then((data) => {
      let counter = 0;
      const depths = data.split(delimiter);
      let lastDepthChecked = parseInt(depths.shift());
      depths.forEach(depth => {
        if (lastDepthChecked < parseInt(depth)) {
          counter += 1;
        };

        lastDepthChecked = depth;
      })

      console.log(counter);
    })
    .catch((error) => {
      throw new Error(error);
    })
}

check_depths('d1_inputs.csv');