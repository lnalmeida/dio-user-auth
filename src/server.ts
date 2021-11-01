import app from '.';

const port: number = process.env.PORT | 3126;

app.listen(port, () => {
    console.log(" App listening on port 3126");
  });
  