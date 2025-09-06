class QueryHelper {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(fields) {
    if (this.queryString.keyword) {
      const regex = { $regex: this.queryString.keyword, $options: "i" };
      this.query = this.query.find({
        $or: fields.map((field) => ({ [field]: regex })),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };

    const excludeFields = ["keyword", "page", "sort", "limit"];
    excludeFields.forEach((field) => delete queryObj[field]);

    // price[gte] → { price: { $gte: value } }
    const mongoQuery = {};

    Object.keys(queryObj).forEach((key) => {
      if (key.includes("[")) {
        const field = key.split("[")[0]; // e.g. price[gte] → price
        const operator = key.split("[")[1].replace("]", ""); // e.g. gte

        if (!mongoQuery[field]) {
          mongoQuery[field] = {};
        }

        const val = queryObj[key];
        mongoQuery[field][`$${operator}`] = isNaN(val) ? val : Number(val);
      } else {
        mongoQuery[key] = queryObj[key];
      }
    });

    this.query = this.query.find(mongoQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = QueryHelper;
