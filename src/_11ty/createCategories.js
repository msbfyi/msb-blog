const slugify = require('slugify')

module.exports = (collectionApi) => {
  const categories = {}

  collectionApi.getFilteredByGlob('./src/blog/*.md').forEach(item => {
    let category = item.data.categories
    category.map((cat) => { 
      // Ignore the ones without a category
      if (typeof cat !== 'string')
      return

      const slug = strToSlug(cat)
      if (Array.isArray(categories[slug])) {
        categories[slug].push(cat)
      } else {
        categories[slug] = [cat]
      }
    })
  })
  console.log(categories)
  return categories  
}

function strToSlug(str) {
  const options = {
    replacement: '-',
    remove: /[&,+()$~%.'':*?<>{}]/g,
    lower: true,
  }
  
  return slugify(str, options);
}