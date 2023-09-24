exports.validate = (dto) => {
  return (request, response, next) => {
    const { error } = dto.validate(request.body, {
      abortEarly: false,
    });
    if (error && error?.details && error?.details?.length > 0) {
      const errors = error.details.map(({ message }) =>
        message.replace(/(")/g, "")
      );

      return response
        .status(400)
        .json({ message: "BadRequestException", errors });
    }

    return next();
  };
};
