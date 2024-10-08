import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import seedSuperAdmin from './app/DB';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin()
    app.listen(config.port, () => {
      console.log(
        `Smartphone Management Dashboard server is listening on port ${config.port}`,
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
