// Using statements.
const moodController = require('./Mood.js');
const userController = require('./User.js');

// Includes static controllers to export.
const controllers = (flags) => {
  if (flags.DEBUG) {
    console.log('Creating static controllers...');
  }

  // Construct the model controllers.
  const User = userController(flags);
  const Mood = moodController(flags);

  // Response when root is called.
  const noRootQuery = (req, res) => {
    if (flags.DEBUG) {
      console.log('API does not allow queries on root endpoint.');
    }

    return res.status(400).json({
      api: flags.API_METADATA,
      error: {
        code: flags.ERRORS.noRootQuery,
        name: 'No Root Query.',
        message: 'Cannot use root as endpoint for API server.',
      },
    });
  };

  // Return the controller functions.
  return {
    noRootQuery,
    Mood,
    User,
  };
};

// Export the middleware.
module.exports = controllers;
