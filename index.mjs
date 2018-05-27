import alfy from 'alfy';
import {stringify} from 'querystring';

alfy.fetch('api.thefinergifs.club/search', {
  query: {
    q: alfy.input,
    size: 5,
  }
}).then(({results, hits}) => {
  const search = {
    title: `Open Finer Gifs Club with '${alfy.input}'`,
    subtitle: `${hits.found} results`,
    arg: `https://thefinergifs.club/?${stringify({q: alfy.input})}`,
    icon: {path: 'icon.png'},
  };

  const resultsData = results
    .map(({fields}) => {
      const {text, fileid} = fields;
      const gifUrl = `https://media.thefinergifs.club/${fileid}.gif`;

      return {
        title: text,
        subtitle: gifUrl,
        arg: gifUrl,
        autocomplete: text,
        icon: {path: 'gif.png'},
        quicklookurl: gifUrl,
      };
    });

  alfy.output([search].concat(resultsData));
});
