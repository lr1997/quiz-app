// export const quizData = {
//   units: [
//     {
//       id: 1,
//       video: {
//         title: '人工智能基础概念',
//         url: '/videos/part_1.mp4',
//         thumbnail: 'https://via.placeholder.com/640x360',
//         duration: '10:00',
//       },
//       questions: [
//         {
//           id: 1,
//           question: '什么是人工智能（AI）？',
//           options: [
//             { id: 1, text: '一种能模仿人类智能的计算机系统' },
//             { id: 2, text: '一个具有自我意识的机器人' },
//             { id: 3, text: '一种编程语言' },
//             { id: 4, text: '一个操作系统' },
//           ],
//           correctAnswer: 1,
//           timeLimit: 5,
//         },
//         {
//           id: 2,
//           question: '以下哪个不是人工智能的主要应用领域？',
//           options: [
//             { id: 1, text: '机器学习' },
//             { id: 2, text: '自然语言处理' },
//             { id: 3, text: '文件存储' },
//             { id: 4, text: '计算机视觉' },
//           ],
//           correctAnswer: 3,
//           timeLimit: 5,
//         },
//         {
//           id: 3,
//           question: '人工智能发展的三个层次中，最高层次是什么？',
//           options: [
//             { id: 1, text: '弱人工智能' },
//             { id: 2, text: '强人工智能' },
//             { id: 3, text: '超级人工智能' },
//             { id: 4, text: '通用人工智能' },
//           ],
//           correctAnswer: 3,
//           timeLimit: 5,
//         },
//       ],
//     },
//     {
//       id: 2,
//       video: {
//         title: '机器学习与深度学习',
//         url: '/videos/part_2.mp4',
//         thumbnail: 'https://via.placeholder.com/640x360',
//         duration: '12:00',
//       },
//       questions: [
//         {
//           id: 4,
//           question: '机器学习的主要类型不包括以下哪个？',
//           options: [
//             { id: 1, text: '监督学习' },
//             { id: 2, text: '非监督学习' },
//             { id: 3, text: '强化学习' },
//             { id: 4, text: '想象学习' },
//           ],
//           correctAnswer: 4,
//           timeLimit: 5,
//         },
//         {
//           id: 5,
//           question: '深度学习是机器学习的一个子集，它的特点是什么？',
//           options: [
//             { id: 1, text: '使用浅层神经网络' },
//             { id: 2, text: '只能处理图像数据' },
//             { id: 3, text: '使用多层神经网络' },
//             { id: 4, text: '只能进行分类任务' },
//           ],
//           correctAnswer: 3,
//           timeLimit: 5,
//         },
//         {
//           id: 6,
//           question: '以下哪个是深度学习的典型应用？',
//           options: [
//             { id: 1, text: '文件压缩' },
//             { id: 2, text: '人脸识别' },
//             { id: 3, text: '文件加密' },
//             { id: 4, text: '硬盘清理' },
//           ],
//           correctAnswer: 2,
//           timeLimit: 5,
//         },
//       ],
//     },
//     {
//       id: 3,
//       video: {
//         title: 'AI的社会影响与未来发展',
//         url: '/videos/part_3.mp4',
//         thumbnail: 'https://via.placeholder.com/640x360',
//         duration: '15:00',
//       },
//       questions: [
//         {
//           id: 7,
//           question: 'AI对就业市场的主要影响是什么？',
//           options: [
//             { id: 1, text: '只会减少就业机会' },
//             { id: 2, text: '只会增加就业机会' },
//             { id: 3, text: '会消除所有工作' },
//             { id: 4, text: '会改变工作性质并创造新的就业机会' },
//           ],
//           correctAnswer: 4,
//           timeLimit: 5,
//         },
//         {
//           id: 8,
//           question: '在AI发展中，最需要关注的伦理问题是什么？',
//           options: [
//             { id: 1, text: '数据隐私与安全' },
//             { id: 2, text: 'AI的外观设计' },
//             { id: 3, text: 'AI的运行速度' },
//             { id: 4, text: 'AI的存储容量' },
//           ],
//           correctAnswer: 1,
//           timeLimit: 5,
//         },
//         {
//           id: 9,
//           question: '以下哪项不是确保AI安全发展的重要因素？',
//           options: [
//             { id: 1, text: '建立伦理准则' },
//             { id: 2, text: '制定监管法规' },
//             { id: 3, text: '提高透明度' },
//             { id: 4, text: '限制所有AI研究' },
//           ],
//           correctAnswer: 4,
//           timeLimit: 5,
//         },
//       ],
//     },
//   ],
// }

export const MODAL_CONFIG = {
  type: 'typeA', // 可选值: 'default', 'typeA', 'typeB', 'typeC'
}

export const quizData = {
  units: [
    {
      id: 1,
      video: {
        title: '第一课时',
        url: '/videos/course1.mp4',
        thumbnail: 'https://via.placeholder.com/640x360',
        duration: 'unknown',
      },
      questions: [
        {
          id: 1,
          question:
            '1956年，( )提出了“人工智能”的概念和发展目标，标志着人工智能这一学科的正式诞生。',
          options: [
            { id: 1, text: '达特茅斯会议' },
            { id: 2, text: '维也纳会议' },
            { id: 3, text: '日内瓦会议' },
            { id: 4, text: '普林斯顿会议' },
          ],
          correctAnswer: 1,
          timeLimit: 5,
        },
        {
          id: 2,
          question: '人工智能起源于20世纪，( )提出的测试模型，用来区别人能智能和机器智能。',
          options: [
            { id: 1, text: '冯·诺依曼' },
            { id: 2, text: '艾伦·图灵' },
            { id: 3, text: '爱因斯坦' },
            { id: 4, text: '比尔·盖茨' },
          ],
          correctAnswer: 2,
          timeLimit: 5,
        },
        {
          id: 3,
          question: '人工智能的目的是让机器能够(  )，以实现某些脑力劳动的机械化。',
          options: [
            { id: 1, text: '具有完全的智能' },
            { id: 2, text: '超越人类智能' },
            { id: 3, text: '完全代替人' },
            { id: 4, text: '模拟人类行为' },
          ],
          correctAnswer: 4,
          timeLimit: 5,
        },
        {
          id: 4,
          question: '人工智能的最本质特征包括自主性和(  )',
          options: [
            { id: 1, text: '灵活性' },
            { id: 2, text: '开放性' },
            { id: 3, text: '适应性' },
            { id: 4, text: '创造性' },
          ],
          correctAnswer: 3,
          timeLimit: 5,
        },
        {
          id: 5,
          question: '尼尔逊教授认为人工智能是关于什么的学科？(  )',
          options: [
            { id: 1, text: '如何制造更快的机器' },
            { id: 2, text: '如何表示、获取、运用知识' },
            { id: 3, text: '如何构建智能系统' },
            { id: 4, text: '如何让机器像人类一样思考' },
          ],
          correctAnswer: 2,
          timeLimit: 5,
        },
        {
          id: 6,
          question: '通过图灵测试的标准是?(  )',
          options: [
            { id: 1, text: '计算机能打败象棋冠军' },
            { id: 2, text: '人类分不清回答问题的是人还是机器' },
            { id: 3, text: '计算机回答问题速度比人快' },
            { id: 4, text: '计算机分不清回答问题的是人还是机器' },
          ],
          correctAnswer: 2,
          timeLimit: 5,
        },
      ],
    },
    {
      id: 2,
      video: {
        title: '第二课时（语音识别技术的概念与原理）',
        url: '/videos/course2.mp4',
        thumbnail: 'https://via.placeholder.com/640x360',
        duration: 'unknown',
      },
      questions: [
        {
          id: 7,
          question: '语音识别过程中，机器把声音先变成什么（）',
          options: [
            { id: 1, text: '声波片段' },
            { id: 2, text: '词语碎片' },
            { id: 3, text: '完整句子' },
            { id: 4, text: '文本片段' },
          ],
          correctAnswer: 1,
          timeLimit: 5,
        },
        {
          id: 8,
          question: '语音识别技术的主要功能是什么(  )',
          options: [
            { id: 1, text: '让机器能播放音乐' },
            { id: 2, text: '把人的说话声变成文字' },
            { id: 3, text: '让手机识别说话的人' },
            { id: 4, text: '把文字转变成语音' },
          ],
          correctAnswer: 2,
          timeLimit: 5,
        },
        {
          id: 9,
          question: '智能音箱在实现过程中通过(   )采集声音',
          options: [
            { id: 1, text: '麦克风' },
            { id: 2, text: '摄像头' },
            { id: 3, text: '传感器' },
            { id: 4, text: '扬声器' },
          ],
          correctAnswer: 1,
          timeLimit: 5,
        },
        {
          id: 10,
          question: '语音识别系统在"密码破解战"阶段的核心任务是什么？(  )',
          options: [
            { id: 1, text: '把声音变成文字' },
            { id: 2, text: '把声母韵母组合起来' },
            { id: 3, text: '把声音特征和密码库做匹配' },
            { id: 4, text: '把声波切成小片段' },
          ],
          correctAnswer: 3,
          timeLimit: 5,
        },
        {
          id: 11,
          question: '系统如何解决"雪花"和"学画"的同音问题?(   )',
          options: [
            { id: 1, text: '让用户重复几次' },
            { id: 2, text: '分析上下文和常见搭配' },
            { id: 3, text: '随机选择一个词语' },
            { id: 4, text: '根据拼音分析' },
          ],
          correctAnswer: 2,
          timeLimit: 5,
        },
        {
          id: 12,
          question: '"智能排版师"环节的主要任务是？(  )',
          options: [
            { id: 1, text: '给声音去除杂音' },
            { id: 2, text: '检查拼音错误' },
            { id: 3, text: '分析上下文' },
            { id: 4, text: '把词语组成通顺句子' },
          ],
          correctAnswer: 4,
          timeLimit: 5,
        },
      ],
    },
    // {
    //   id: 3,
    //   video: {
    //     title: '第三课时测试题（应用与不足）',
    //     url: '/videos/course3.mp4',
    //     thumbnail: 'https://via.placeholder.com/640x360',
    //     duration: 'unknown',
    //   },
    //   questions: [
    //     {
    //       id: 13,
    //       question: '下列使用了语音识别技术的是(  )',
    //       options: [
    //         { id: 1, text: '打语音电话聊天' },
    //         { id: 2, text: '用手机软件录音' },
    //         { id: 3, text: '通过语音输入录入文字' },
    //         { id: 4, text: '按导航的语音提示开车' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 14,
    //       question: '下面没有使用语音识别技术的是(  )',
    //       options: [
    //         { id: 1, text: '语音助手查天气' },
    //         { id: 2, text: '文字转语音' },
    //         { id: 3, text: '语音转文字' },
    //         { id: 4, text: '智能家居语音控制' },
    //       ],
    //       correctAnswer: 2,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 15,
    //       question: '语音助手出错可能的原因是(  )',
    //       options: [
    //         { id: 1, text: '噪音干扰' },
    //         { id: 2, text: '方言口音' },
    //         { id: 3, text: '环境太吵' },
    //         { id: 4, text: '音调音量' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 16,
    //       question: '机器听不懂带口音的陕西话，需要提升什么能力(  )',
    //       options: [
    //         { id: 1, text: '声音放大能力' },
    //         { id: 2, text: '方言识别能力' },
    //         { id: 3, text: '语音模仿能力' },
    //         { id: 4, text: '普通话翻译能力' },
    //       ],
    //       correctAnswer: 2,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 17,
    //       question: '下面活动中应用了智能语音技术的是(   )',
    //       options: [
    //         { id: 1, text: '当天黑了窗帘会自动拉合' },
    //         { id: 2, text: '下雨天窗户会自动关闭' },
    //         { id: 3, text: '夜里起床说“开灯”夜灯就会亮' },
    //         { id: 4, text: '用翻译软件查不会的单词' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 18,
    //       question: '下面关于语音识别说法正确的是(  )',
    //       options: [
    //         { id: 1, text: '语音识别不会出错' },
    //         { id: 2, text: '语音识别可以替代人类交流' },
    //         { id: 3, text: '语音识别能理解人类情感' },
    //         { id: 4, text: '语音识别能把语音转成文字' },
    //       ],
    //       correctAnswer: 4,
    //       timeLimit: 5,
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   video: {
    //     title: '第四课时测试题',
    //     url: '/videos/course4.mp4',
    //     thumbnail: 'https://via.placeholder.com/640x360',
    //     duration: 'unknown',
    //   },
    //   questions: [
    //     {
    //       id: 19,
    //       question: '图像识别技术的主要目的是让计算机（ ）',
    //       options: [
    //         { id: 1, text: '存储更多图片' },
    //         { id: 2, text: '理解图片内容' },
    //         { id: 3, text: '区分图片颜色' },
    //         { id: 4, text: '快速传输图片' },
    //       ],
    //       correctAnswer: 2,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 20,
    //       question: '计算机进行图像识别的第一步是（）',
    //       options: [
    //         { id: 1, text: '进行图片分类操作' },
    //         { id: 2, text: '调整图片颜色数值' },
    //         { id: 3, text: '去掉图片无关信息' },
    //         { id: 4, text: '把图片输入计算机' },
    //       ],
    //       correctAnswer: 4,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 21,
    //       question: '给图片“洗澡”在图像识别中属于哪一步？（）',
    //       options: [
    //         { id: 1, text: '图像输入' },
    //         { id: 2, text: '图像预处理' },
    //         { id: 3, text: '特征提取' },
    //         { id: 4, text: '结果输出' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 22,
    //       question: '图片特征提取的主要目的是（）',
    //       options: [
    //         { id: 1, text: '让图片更清晰' },
    //         { id: 2, text: '找出关键密码' },
    //         { id: 3, text: '存储更多特征' },
    //         { id: 4, text: '加快查找速度' },
    //       ],
    //       correctAnswer: 2,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 23,
    //       question: '计算机参考“狗狗百科全书”这一步是要（）',
    //       options: [
    //         { id: 1, text: '匹配图片特征数据' },
    //         { id: 2, text: '增加图片清晰程度' },
    //         { id: 3, text: '将图片转化成数据' },
    //         { id: 4, text: '生成图像分析报告' },
    //       ],
    //       correctAnswer: 1,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 24,
    //       question: '判断狗狗品种最关键的是（）',
    //       options: [
    //         { id: 1, text: '图片像素具体数量' },
    //         { id: 2, text: '模型匹配运行速度' },
    //         { id: 3, text: '照片拍摄清晰程度' },
    //         { id: 4, text: '特征与模型匹配度' },
    //       ],
    //       correctAnswer: 4,
    //       timeLimit: 5,
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   video: {
    //     title: '第五课时测试题',
    //     url: '/videos/course5.mp4',
    //     thumbnail: 'https://via.placeholder.com/640x360',
    //     duration: 'unknown',
    //   },
    //   questions: [
    //     {
    //       id: 25,
    //       question: '下列场景用到了图像识别技术的是(   )',
    //       options: [
    //         { id: 1, text: '车牌识别' },
    //         { id: 2, text: '图像美化' },
    //         { id: 3, text: '指纹识别' },
    //         { id: 4, text: '照片合成' },
    //       ],
    //       correctAnswer: 1,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 26,
    //       question: '以下哪个选项不属于图像识别技术在生活中的典型应用?(   )',
    //       options: [
    //         { id: 1, text: '刷脸门禁' },
    //         { id: 2, text: '智能识花' },
    //         { id: 3, text: '微信扫码' },
    //         { id: 4, text: '拍照搜题' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 27,
    //       question: '校园门口的人脸识别门禁系统通过(   )采集图像',
    //       options: [
    //         { id: 1, text: '图像识别' },
    //         { id: 2, text: '红外传感器' },
    //         { id: 3, text: '摄像头' },
    //         { id: 4, text: '面部扫描' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 28,
    //       question: '图像识别技术无法用于以下哪个场景(  )',
    //       options: [
    //         { id: 1, text: '超市扫码结账' },
    //         { id: 2, text: '仪器测量体温' },
    //         { id: 3, text: '门禁人脸识别' },
    //         { id: 4, text: '植物种类查询' },
    //       ],
    //       correctAnswer: 2,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 29,
    //       question: '以下哪项不是计算机比人类更适合图像识别工作的原因(  )',
    //       options: [
    //         { id: 1, text: '能理解图片中的情感' },
    //         { id: 2, text: '能24小时在线工作' },
    //         { id: 3, text: '有超快的计算速度' },
    //         { id: 4, text: '有超持久的记忆力' },
    //       ],
    //       correctAnswer: 1,
    //       timeLimit: 5,
    //     },
    //     {
    //       id: 30,
    //       question: '下面哪种情况可能让图像识别出错(   )',
    //       options: [
    //         { id: 1, text: '图片尺寸太大' },
    //         { id: 2, text: '数据库资料齐全' },
    //         { id: 3, text: '图片抖动模糊' },
    //         { id: 4, text: '图片清晰美观' },
    //       ],
    //       correctAnswer: 3,
    //       timeLimit: 5,
    //     },
    // ],
    // },
  ],
}
