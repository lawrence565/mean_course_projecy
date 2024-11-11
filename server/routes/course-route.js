const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidator;

router.use((req, res, next) => {
  console.log("course route正在接收一個request");
  next();
});

router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"]) // 找到跟instructor 有關的資料, 需使用query 類型的資料
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send("遇到某些錯誤" + e);
  }
});

router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send("出現某些錯誤" + e);
  }
});

//新增課程
router.post("/", async (req, res) => {
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res.sendStatus(400).send("只有教師才能使用這個api");
  } else {
    let { title, description, price } = req.body;
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let saveCourses = await newCourse.save();
    return res.send({ msg: "課程建立成功", saveCourses });
  }
});

//用講師id尋找課程
router.get("/instructor/:instructor_id", async (req, res) => {
  let instructor_uid = req.params;
  try {
    let courseFound = await Course.find({ instructor: instructor_id })
      .populate("instructor", ["name", "email"])
      .exec();
    if (!courseFound) {
      return res.status(400).send("無法找到您開設的課程");
    }
    return res.send(courseFound);
  } catch (e) {
    res.status(400).send(e);
  }
});

// 使用學生id 尋找已註冊的課程
router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  try {
    let courseFound = await Course.find({ students: _student_id })
      .populate("instructor", ["name", "email"])
      .exec();
    if (!courseFound) {
      return res.status(400).send("無法找到所註冊的課程");
    }
    return res.send(courseFound);
  } catch (e) {
    res.status(400).send(e);
  }
});

// 使用課程名稱 尋找課程
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let courseFound = await Course.find({ title: name })
      .populate("instructor", ["name", "email"])
      .exec();
    if (!courseFound) {
      return res.status(400).send("無法找到該課程");
    }
    return res.send(courseFound);
  } catch (e) {
    res.status(400).send(e);
  }
});

// 讓學生透過課程ID 來註冊新課程
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id });
    //JWT
    course.students.push(req.user._id);
    await course.save();
    res.send("註冊完成");
  } catch (e) {
    console.log(e);
  }
});

//修改課程
router.patch("/:_id", async (req, res) => {
  // 驗證數據符合規範
  let { error } = courseValidation(req.body);
  if (error) return res.status(500).send(error.details[0].message);

  // 確認課程存在
  let { id, title, description, price, instructor, students } = req.params;
  try {
    let courseFound = await Course.find({ _id }).exec();
    if (!courseFound) {
      return res.status(400).send("找不到課程，無法修改課程");
    }

    // 使用者必須是Instructor
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "課程已修改完畢",
        updatedCourse,
      });
    } else {
      return res.sendStatus(400).send("只有此課程教師才能修改課程");
    }
  } catch (e) {
    return res.status(500).send("出現某些錯誤");
  }
});

// 刪除課程
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // 確認課程存在
  try {
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(400).send("找不到課程，無法修改課程");
    }

    // 使用者必須是Instructor
    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.send("課程已刪除");
    } else {
      return res.sendStatus(400).send("只有此課程教師才能刪除課程");
    }
  } catch (e) {
    return res.status(500).send("出現某些錯誤");
  }
});

module.exports = router;
