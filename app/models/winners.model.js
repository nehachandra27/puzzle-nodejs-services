module.exports = mongoose => {
    const Winners = mongoose.model(
      "winners",
      mongoose.Schema(
        {
          name: String,
          email: String,
          cellno: String
        },
        { timestamps: true }
      )
    );
    return Winners;
  };