export const quizData = {
  units: [
    {
      id: 1,
      video: {
        title: '人工智能基础概念',
        url: '/videos/part_1.mp4',
        thumbnail: 'https://via.placeholder.com/640x360',
        duration: '10:00',
      },
      questions: [
        {
          id: 1,
          question: '什么是人工智能（AI）？',
          options: [
            { id: 1, text: '一种能模仿人类智能的计算机系统' },
            { id: 2, text: '一个具有自我意识的机器人' },
            { id: 3, text: '一种编程语言' },
            { id: 4, text: '一个操作系统' },
          ],
          correctAnswer: 1,
          timeLimit: 5,
        },
        {
          id: 2,
          question: '以下哪个不是人工智能的主要应用领域？',
          options: [
            { id: 1, text: '机器学习' },
            { id: 2, text: '自然语言处理' },
            { id: 3, text: '文件存储' },
            { id: 4, text: '计算机视觉' },
          ],
          correctAnswer: 3,
          timeLimit: 5,
        },
        {
          id: 3,
          question: '人工智能发展的三个层次中，最高层次是什么？',
          options: [
            { id: 1, text: '弱人工智能' },
            { id: 2, text: '强人工智能' },
            { id: 3, text: '超级人工智能' },
            { id: 4, text: '通用人工智能' },
          ],
          correctAnswer: 3,
          timeLimit: 5,
        },
      ],
    },
    {
      id: 2,
      video: {
        title: '机器学习与深度学习',
        url: '/videos/part_2.mp4',
        thumbnail: 'https://via.placeholder.com/640x360',
        duration: '12:00',
      },
      questions: [
        {
          id: 4,
          question: '机器学习的主要类型不包括以下哪个？',
          options: [
            { id: 1, text: '监督学习' },
            { id: 2, text: '非监督学习' },
            { id: 3, text: '强化学习' },
            { id: 4, text: '想象学习' },
          ],
          correctAnswer: 4,
          timeLimit: 5,
        },
        {
          id: 5,
          question: '深度学习是机器学习的一个子集，它的特点是什么？',
          options: [
            { id: 1, text: '使用浅层神经网络' },
            { id: 2, text: '只能处理图像数据' },
            { id: 3, text: '使用多层神经网络' },
            { id: 4, text: '只能进行分类任务' },
          ],
          correctAnswer: 3,
          timeLimit: 5,
        },
        {
          id: 6,
          question: '以下哪个是深度学习的典型应用？',
          options: [
            { id: 1, text: '文件压缩' },
            { id: 2, text: '人脸识别' },
            { id: 3, text: '文件加密' },
            { id: 4, text: '硬盘清理' },
          ],
          correctAnswer: 2,
          timeLimit: 5,
        },
      ],
    },
    {
      id: 3,
      video: {
        title: 'AI的社会影响与未来发展',
        url: '/videos/part_3.mp4',
        thumbnail: 'https://via.placeholder.com/640x360',
        duration: '15:00',
      },
      questions: [
        {
          id: 7,
          question: 'AI对就业市场的主要影响是什么？',
          options: [
            { id: 1, text: '只会减少就业机会' },
            { id: 2, text: '只会增加就业机会' },
            { id: 3, text: '会消除所有工作' },
            { id: 4, text: '会改变工作性质并创造新的就业机会' },
          ],
          correctAnswer: 4,
          timeLimit: 5,
        },
        {
          id: 8,
          question: '在AI发展中，最需要关注的伦理问题是什么？',
          options: [
            { id: 1, text: '数据隐私与安全' },
            { id: 2, text: 'AI的外观设计' },
            { id: 3, text: 'AI的运行速度' },
            { id: 4, text: 'AI的存储容量' },
          ],
          correctAnswer: 1,
          timeLimit: 5,
        },
        {
          id: 9,
          question: '以下哪项不是确保AI安全发展的重要因素？',
          options: [
            { id: 1, text: '建立伦理准则' },
            { id: 2, text: '制定监管法规' },
            { id: 3, text: '提高透明度' },
            { id: 4, text: '限制所有AI研究' },
          ],
          correctAnswer: 4,
          timeLimit: 5,
        },
      ],
    },
  ],
}

export const MODAL_CONFIG = {
  type: 'typeA', // 可选值: 'default', 'typeA', 'typeB', 'typeC'
}
