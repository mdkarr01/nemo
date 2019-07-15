async function seedPosts() {
  await Post.remove({})
  for (const i of new Array(40)) {
    let newPost = {
      title: faker.lorem(word),
      description: faker.lorem.text(),
      author: {
        'user': 'mike',
        '_id': 'ldfjldfj'
      }
    }
    await Post.create({ newPost });
  }

  async function seedPosts() {
    await Post.remove({});
    for (const i of new Array(40)) {
      const post = {
        title: faker.lorem.word(),
        description: faker.lorem.text(),
        author: {
          '_id': '5bb27cd1f986d278582aa58c',
          'username': 'ian'
        }
      }
      await Post.create(post);
    }
    console.log('40 new posts created');
< !-- } -->