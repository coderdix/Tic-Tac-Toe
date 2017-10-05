function readyFn() {

    let emptyBoard = true,
        active     = true,
        catGame    = [],
        marks = ['x', 'o'],
        board = {'1': '', '2': '', '3': '', '4': '', '5': '',
                 '6': '', '7': '', '8': '', '9': ''},
        map   = {'1': '', '2': '', '3': '', '4': '', '5': '',
                 '6': '', '7': '', '8': '', '9': ''},
        users = {
          player_1: {role: 'user', mark: '', turn: false},
          player_2: {role: 'computer', mark: '', turn: false}
        }

    function startGame() {
      if (emptyBoard) {
        $('#x').on('click', function(e) {
            selectMark(users, marks[0])
        })
        $('#o').on('click', function(e) {
            selectMark(users, marks[1])
        })
        $('.turn').text('To begin please select: Bolt or Sun')
      }
    }

    function selectMark(player, mark) {
      let setMark = $('#' + mark).attr('value'),
          user = player.player_1
          comp = player.player_2
      user.mark = setMark
      if (user.mark === 'x') {
          $('.mark.x').text('Richard -')
          $('.mark.o').text('Jarvis -')
          user.turn = true
          comp.mark = 'o'
          $('.cell').on()
      } else if (user.mark === 'o') {
          $('.mark.x').text('Jarvis -')
          $('.mark.o').text('Richard -')
          comp.turn = true
          comp.mark = 'x'
      }
      $('#x, #o').off()
      firstMove(users)
    }

    function firstMove(player) {
      let user = player.player_1
          comp = player.player_2
      if (user.mark === 'x' && user.turn && active) {
          userMove(users)
      } else if (user.mark === 'o' && comp.turn && active) {
          initSystemMove(users)
      }
    }

    function initSystemMove(player) {
      let user = player.player_1,
          comp = player.player_2,
          cell = Math.floor((Math.random() * 9) + 1)
      $("div[value="+cell+"]")
        .html('<img class="icon bolt mark" src="icons/bolt.svg">')
        .addClass('marked')
      board[cell] = comp.mark
      map[cell]   = comp.role
      user.turn = true
      comp.turn = false
      userMove(users)
    }

    function userMove(player) {
      let user = player.player_1,
          comp = player.player_2
      checkGame()
      if (user.turn && !comp.turn && active) {
        $('.turn').text('Richard, it\'s on you')
          $('.row > div').mouseenter(function() {
              $(this).addClass('active').siblings().removeClass('active')
              if ($(this).hasClass('marked')) {
                $(this).off('click')
              }
          }).mouseleave(function() {
              $(this).removeClass('active')
          })
          $('.cell').on('click', function() {
              let cellNum = $(this).attr('value')
              $(this).addClass('marked')
              if (user.mark === 'x') {
                $(this).html('<img class="icon bolt mark" src="icons/bolt.svg">')
              } else if (user.mark === 'o') {
                $(this).html('<img class="icon sun mark" src="icons/sun.svg">')
              }
              $(this).removeClass('active')
              board[cellNum] = user.mark
              map[cellNum]   = user.role
              emptyBoard = false
              user.turn = false
              comp.turn = true
              systemMove(users)
          })
      } else if (comp.turn && !user.turn) {
          systemMove(users)
      }
    }

    function systemMove(player) {
      let user = player.player_1,
          comp = player.player_2,
          tile = $('.cell'),
          cell = [],
          pick
      checkGame()
      $('.row > div, .cell').off()
      if (comp.turn && !user.turn && active) {
        $('.turn').text('Jarvis, it\'s on you')
        $('.cell').each(function(index, element) {
          let cellNum  = (index + 1),
              cellPick = Math.floor((Math.random() * 9) + 1)
          if (!$(this).hasClass('marked')) {
            cell.push(cellNum)
            return
          }
        })
        pick = cell[Math.floor(Math.random() * cell.length)]
        if (comp.mark === 'x') {
          $("div[value="+pick+"]")
            .html('<img class="icon bolt mark" src="icons/bolt.svg">')
        } else if (comp.mark === 'o') {
          $("div[value="+pick+"]")
            .html('<img class="icon sun mark" src="icons/sun.svg">')
        }
        $("div[value="+pick+"]").addClass('marked')
        board[pick] = comp.mark
        map[pick]   = comp.role
        user.turn = true
        comp.turn = false
        userMove(users)
      } else if (user.turn && !comp.turn && active) {
          userMove(users)
      }
    }

    function checkGame() {
      let arr = Object.values(board), x, o
      x = arr.filter(mark => mark === 'x')
      o = arr.filter(mark => mark === 'o')
      catGame = x.concat(o)
      if (catGame.length > 2 && catGame.length <= 9) {
        win(catGame)
        track()
      }

    }

    function draw() {
      $('.turn').text('Cat Game: It\'s a draw!')
      active = false
      console.log('It\'s a damn draw!')
    }

    function track() {
      let userCombo_1 = [], userCombo_2 = [], userCombo_3 = [],
          userCombo_4 = [], userCombo_5 = [], userCombo_6 = [],
          userCombo_7 = [], userCombo_8 = []

      userCombo_1.push(map['1'], map['2'], map['3'])
      userCombo_2.push(map['1'], map['4'], map['7'])
      userCombo_3.push(map['1'], map['5'], map['9'])
      userCombo_4.push(map['2'], map['5'], map['8'])
      userCombo_5.push(map['3'], map['6'], map['9'])
      userCombo_6.push(map['3'], map['5'], map['7'])
      userCombo_7.push(map['4'], map['5'], map['6'])
      userCombo_8.push(map['7'], map['8'], map['9'])

      switch (true) {
        case userCombo_1.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 1, 2 & 3')
          break
        case userCombo_2.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 1, 4 & 7')
          break
        case userCombo_3.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 1, 5 & 9')
          break
        case userCombo_4.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 2, 5 & 8')
          break
        case userCombo_5.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 3, 6 & 9')
          break
        case userCombo_6.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 3, 5 & 7')
          break
        case userCombo_7.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 4, 5 & 6')
          break
        case userCombo_8.every(player => player === 'user'):
          active = false
          $('.turn').html('Richard wins the match using squares 7, 8 & 9')
          break
        case userCombo_1.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 1, 2 & 3')
          break
        case userCombo_2.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 1, 4 & 7')
          break
        case userCombo_3.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 1, 5 & 9')
          break
        case userCombo_4.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 2, 5 & 8')
          break
        case userCombo_5.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 3, 6 & 9')
          break
        case userCombo_6.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 3, 5 & 7')
          break
        case userCombo_7.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 4, 5 & 6')
          break
        case userCombo_8.every(player => player === 'computer'):
          active = false
          $('.turn').html('Jarvis wins the match using squares 7, 8 & 9')
        default:
          console.log('No winner yet.')
      }
      console.log('track: ', map)
    }

    function win(catGame) {
      let markCombo_1 = [], markCombo_2 = [], markCombo_3 = [],
          markCombo_4 = [], markCombo_5 = [], markCombo_6 = [],
          markCombo_7 = [], markCombo_8 = []

      markCombo_1.push(board['1'], board['2'], board['3'])
      markCombo_2.push(board['1'], board['4'], board['7'])
      markCombo_3.push(board['1'], board['5'], board['9'])
      markCombo_4.push(board['2'], board['5'], board['8'])
      markCombo_5.push(board['3'], board['6'], board['9'])
      markCombo_6.push(board['3'], board['5'], board['7'])
      markCombo_7.push(board['4'], board['5'], board['6'])
      markCombo_8.push(board['7'], board['8'], board['9'])

      switch (true) {
        case markCombo_1.every(mark => mark === 'x') ||
             markCombo_1.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_2.every(mark => mark === 'x') ||
             markCombo_2.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_3.every(mark => mark === 'x') ||
             markCombo_3.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_4.every(mark => mark === 'x') ||
             markCombo_4.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_5.every(mark => mark === 'x') ||
             markCombo_5.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_6.every(mark => mark === 'x') ||
             markCombo_6.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_7.every(mark => mark === 'x') ||
             markCombo_7.every(mark => mark === 'o'):
             active = false
          break
        case markCombo_8.every(mark => mark === 'x') ||
             markCombo_8.every(mark => mark === 'o'):
             active = false
          break
        case catGame.length === 9 && active:
          draw()
          break
        default:
          console.log('The game isn\'t over yet.')

      }
      console.log('board: ', board)
    }

    function resetGame() {
      emptyBoard = true,
      active     = true,
      catGame    = [],
      marks = ['x', 'o'],
      board = {'1': '', '2': '', '3': '', '4': '', '5': '',
               '6': '', '7': '', '8': '', '9': ''},
      map   = {'1': '', '2': '', '3': '', '4': '', '5': '',
               '6': '', '7': '', '8': '', '9': ''}

      $('mark.x').html('<img class="iconic bolt" src="icons/bolt.svg">')
      $('mark.o').html('<img class="iconic bolt" src="icons/sun.svg">')
      $('.mark').text('-')
      $('.cell').html('')
      $('.cell, #x, #o').off()
      $('.cell').removeClass('marked')
      startGame()
    }

    startGame()
    $('#reset').click(resetGame)
}

$(readyFn)
