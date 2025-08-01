// utils/export.js
import { useQuizStore } from '@/stores/quiz' // 导入 store

// 在函数前面加上 export
export function exportResults() {
  const store = useQuizStore() // 获取 store 实例

  // 获取学生信息
  const studentId = store.studentId
  const studentName = store.studentName

  const data = store.answers.map((answer) => {
    // 计算这道题的分数
    let basicScore = answer.isCorrect ? store.scoring.points.basic : 0 // 10分或0分
    let timeScore = answer.isCorrect
      ? answer.isQuick
        ? store.scoring.points.fast
        : store.scoring.points.overtime
      : 0 // 15分或10分或0分

    return {
      单元: `单元${answer.unitId}`,
      题号: answer.questionId,
      结果: answer.isCorrect ? '正确' : '错误',
      用时: `${answer.answerTime.toFixed(1)}秒`,
      快速答题: answer.isQuick ? '是' : '否',
      基础得分: basicScore, // 10分或0分
      实际得分: timeScore, // 15分或10分或0分
      答题时间: new Date(answer.timestamp).toLocaleString(),
    }
  })

  // 添加总计行
  data.push({
    单元: '总计',
    题号: '-',
    结果: `正确率: ${((store.scoring.basicScore.correctCount / store.answers.length) * 100).toFixed(1)}%`,
    用时: '-',
    快速答题: `快速答对: ${store.scoring.timeScore.fastAnswers}题`,
    基础得分: `${store.scoring.basicScore.current}/${store.totalPossibleScores.basic}`,
    实际得分: `${store.scoring.timeScore.current}/${store.totalPossibleScores.time}`,
    答题时间: `总用时: ${((new Date(store.endTime) - new Date(store.startTime)) / 1000 / 60).toFixed(1)}分钟`,
  })

  // 生成CSV内容
  // 添加学号和姓名列到头部和数据行
  const headers = ['学号', '姓名', ...Object.keys(data[0])]
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      [studentId, studentName, ...headers.slice(2).map((header) => `"${row[header]}"`)].join(','),
    ),
  ].join('\n')

  // 添加BOM标记以支持中文
  const blob = new Blob(['\ufeff' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  })

  // 创建下载链接
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  const timestamp = new Date().toISOString().split('T')[0]
  // 包含学号和姓名在文件名中，如果它们存在
  const filename = `${studentId || '未知学号'}_${studentName || '未知姓名'}_学习记录-${timestamp}.csv`
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
