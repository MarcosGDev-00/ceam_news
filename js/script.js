// Manipulações do DOM
// Carregamento da página
$(document).ready(function () {
  loadIndex();
  loadContentHome();
  if ($(window).width() < 1023) {
    toggleMenuOnClick();
  }
});

// Navegaçã dinâmica: Carregar página sem refresh, usando o main
function loadPage(url) {
  $.ajax({
    url: url,
    type: 'GET',
    success: function (response) {
      $('#main-content').html(response);
      loadContentHome();
      loadContentAbout();
      enviarDenuncia();
    },
    error: function (error) {
      console.error('Erro ao carregar a página:', error);
    },
  });
}

// Função para limitar o texto da notícia exibida
function limitarTexto(texto, limite) {
  return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
}

// Conteúdo das pádinas
// Index: Conteúdo do Header e do Footer fixos
function loadIndex() {
  $.ajax({
    url: 'config/index.php',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      loadMenu(data.menu);
      loadHeaderInfo(data.header);
      loadFooterInfo(data.header);
      loadMenuFooter(data.menu_footer);
    },
    error: function (error) {
      console.error('Erro ao carregar conteúdo:', error);
    },
  });
}

function loadHeaderInfo(headerData) {
  $('#logo_ceam').attr('src', headerData.logo_ceam);
  $('#texto_ceam').html(headerData.texto_ceam);
  $('#titulo').html(headerData.titulo);
}

function loadMenu(menuData) {
  var menuList = $('#menu-list');

  $.each(menuData, function (index, item) {
    var li = $('<li></li>');
    var link = $('<a></a>')
      .attr('href', item.link)
      .text(item.nome)
      .addClass('menu-link');
    li.append(link);
    menuList.append(li);
  });

  $('.header-link').addClass('menu-link');
  $(document).on('click', '.menu-link', function (event) {
    event.preventDefault();
    var link = $(this).attr('href');
    loadPage(link);
    loadAbout();
  });
}

function loadFooterInfo(headerData) {
  $('#img-footer').attr('src', headerData.logo_ceam);
}

function loadMenuFooter(menuFooterData) {
  $('.nav').each(function () {
    var title = $('<div class="title-nav"><h4>' + menuFooterData[0].titulo_menu + '</h4></div>');
    var menu = $('<div class="menu-nav"><ul></ul></div>');

    menuFooterData.forEach(function (item) {
      if (item.titulo_menu === menuFooterData[0].titulo_menu) {
        var li = $('<li><a href="' + item.link_menu + '">' + item.item_menu + '</a></li>');
        $('ul', menu).append(li);
      }
    });

    $(this).append(title);
    $(this).append(menu);

    menuFooterData = menuFooterData.filter(function (item) {
      return item.titulo_menu !== menuFooterData[0].titulo_menu;
    });
  });
}

// Notícias do Home: Carregar notícias na página inicial
function loadContentHome() {
  $.ajax({
    url: 'config/home_content.php',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      loadNews(data.noticias);
      loadCard(data.card);
      loadLat(data.lat);
      loadGeral(data.geral);
    },
    error: function (error) {
      console.error('Erro ao carregar conteúdo:', error);
    },
  });
}

// Notícias Principais
function loadNews(noticias) {
  $('#first-news-link').attr(
    'href',
    'pages/noticia.html?id=' + noticias[0].id,
  );
  $('#first-news-link').addClass('menu-link');
  $('#first-news-title').text(noticias[0].titulo);
  $('#first-news-date').text(limitarTexto(noticias[0].texto, 100));
  $('.first-news').css(
    'background-image',
    'url(' + noticias[0].imagem_url + ')',
  );
  $('#first-news-link').click(function (event) {
    event.preventDefault();
    detalheNot(noticias[0].id);
  });

  $('#second-news-link').attr(
    'href',
    'pages/noticia.html?id=' + noticias[1].id,
  );
  $('#second-news-link').addClass('menu-link');
  $('#second-news-title').text(noticias[1].titulo);
  $('#second-news-date').text(limitarTexto(noticias[1].texto, 100));
  $('.second-news').css(
    'background-image',
    'url(' + noticias[1].imagem_url + ')',
  );
  $('#second-news-link').click(function (event) {
    event.preventDefault();
    detalheNot(noticias[1].id);
  });

  $('#third-news-link').attr(
    'href',
    'pages/noticia.html?id=' + noticias[2].id,
  );
  $('#third-news-link').addClass('menu-link');
  $('#third-news-title').text(noticias[2].titulo);
  $('.haveNewsA').css(
    'background-image',
    'url(' + noticias[2].imagem_url + ')',
  );
  $('#third-news-link').click(function (event) {
    event.preventDefault();
    detalheNot(noticias[2].id);
  });

  $('#fourth-news-link').attr(
    'href',
    'pages/noticia.html?id=' + noticias[3].id,
  );
  $('#fourth-news-link').addClass('menu-link');
  $('#fourth-news-title').text(noticias[3].titulo);
  $('.haveNewsB').css(
    'background-image',
    'url(' + noticias[3].imagem_url + ')',
  );
  $('#fourth-news-link').click(function (event) {
    event.preventDefault();
    detalheNot(noticias[3].id);
  });
}

// Notícias Secundárias
function loadCard(card) {
  var container = document.getElementById('noticias-container');
  card.forEach(function (noticia, index) {
    var card = document.createElement('div');
    card.classList.add('cards');

    var imagem = document.createElement('div');
    imagem.classList.add('img-card');
    var img = document.createElement('img');
    img.src = noticia.imagem_url;
    imagem.appendChild(img);

    var texto = document.createElement('div');
    texto.classList.add('text-card');
    var titulo = document.createElement('h4');
    titulo.textContent = noticia.titulo;

    var link = document.createElement('a');
    link.href = 'pages/noticia.html?id=' + noticia.id;
    link.classList.add('menu-link');
    link.appendChild(titulo);
    link.onclick = function (event) {
      event.preventDefault();
      detalheNot(noticia.id);
    };

    var p = document.createElement('p');
    p.textContent = limitarTexto(noticia.texto, 50);

    texto.appendChild(link);
    texto.appendChild(p);

    card.appendChild(imagem);
    card.appendChild(texto);

    container.appendChild(card);
  });
}

// Outras Notícias
function loadLat(lat) {
  var container = document.getElementById('noticias-lateral-container');
  lat.forEach(function (noticia, index) {
    var card = document.createElement('div');
    card.classList.add('card-lat');

    var imagem = document.createElement('div');
    imagem.classList.add('img-lat');
    var img = document.createElement('img');
    img.src = noticia.imagem_url;
    imagem.appendChild(img);

    var text = document.createElement('div');
    text.classList.add('text-lat');
    var titulo = document.createElement('h4');
    titulo.textContent = noticia.titulo;

    var link = document.createElement('a');
    link.href = 'pages/noticia.html?id=' + noticia.id;
    link.classList.add('menu-link');
    link.appendChild(titulo);
    link.onclick = function (event) {
      event.preventDefault();
      detalheNot(noticia.id);
    };

    var p = document.createElement('p');
    p.textContent = noticia.texto.substring(0, 50) + '...';

    link.appendChild(titulo);
    text.appendChild(link);
    text.appendChild(p);

    card.appendChild(imagem);
    card.appendChild(text);

    container.appendChild(card);
  });
}

function loadGeral(geral) {
  var container = document.getElementById('noticias-geral-container');
  geral.forEach(function (noticia, index) {
    var card = document.createElement('div');
    card.classList.add('card-geral');

    var imagem = document.createElement('div');
    imagem.classList.add('img-geral');
    var img = document.createElement('img');
    img.src = noticia.imagem_url;
    imagem.appendChild(img);

    var text = document.createElement('div');
    text.classList.add('text-geral');
    var titulo = document.createElement('h4');
    titulo.textContent = noticia.titulo;

    var link = document.createElement('a');
    link.href = 'pages/noticia.html?id=' + noticia.id;
    link.classList.add('menu-link');
    link.appendChild(titulo);
    link.onclick = function (event) {
      event.preventDefault();
      detalheNot(noticia.id);
    };

    var p = document.createElement('p');
    p.textContent = noticia.texto.substring(0, 50) + '...';

    link.appendChild(titulo);
    text.appendChild(link);
    text.appendChild(p);

    card.appendChild(imagem);
    card.appendChild(text);

    container.appendChild(card);
  });
}

// Conteúdo da página de detalhes da notícia: Detalhes da notícia de acordo com o link clicado
function detalheNot(id) {
  $.ajax({
    url: 'config/detalhes.php?id=' + id,
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      $('#tituloNot').text(response.titulo);
      $('#class').text('Classificação: ' + response.classificacao);
      $('#data').text('Data de Publicação: ' + response.data_publicacao);
      $('#autor').text('Autor: ' + response.autor);
      $('#imgNot').attr('src', response.imagem_url);
      $('#textoNot').text(response.texto);

      var linksHTML = '';
      $.each(response.links, function (index, link) {
        linksHTML += '<a href="' + link.url + '">' + link.texto + '</a><br>';
      });
      $('#linksNoticia').html(linksHTML);
    },
    error: function (xhr, status, error) {
      console.error('Erro:', status, error);
    },
  });
}

// Notícias do Sobre: Carregar notícias na página de Sobre
function loadContentAbout() {
  $.ajax({
    url: 'config/about_content.php',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      loadCardAbout(data.about);
      loadServices(data.services);
      loadMembers(data.members);
    },
    error: function (error) {
      console.error('Erro ao carregar conteúdo:', error);
    },
  });
}

function loadCardAbout(initial) {
  if (initial.length > 0) {
      var aboutInfo = initial[0];

      $('#title_about').text(aboutInfo.titulo);
      $('#text_about').text(aboutInfo.texto);
      $('#img_about').attr('src', aboutInfo.imagem);
  } else {
      console.error('Nenhum dado sobre a organização encontrado.');
  }
}

function loadServices(services) {
  var container = $('.line_cards');

  services.forEach(function(service) {
    var aboutCard = $('<div>').addClass('about_card');
    var aboutIcon = $('<div>').addClass('about_icon');
    var img = $('<img>').attr('src', service.imagem).attr('alt', service.name);
    aboutIcon.append(img);

    var textAbout = $('<div>').addClass('text_about');
    var memberName = $('<span>').attr('id', 'member_name').text(service.titulo);
    var memberSummary = $('<p>').attr('id', 'member_summary').text(service.texto);
    textAbout.append(memberName, memberSummary);

    aboutCard.append(aboutIcon, textAbout);
    container.append(aboutCard);
  });
}

function loadMembers(members) {
  var container = $('.member_cards');

  members.forEach(function(member) {
    var aboutCard = $('<div>').addClass('member');
    var aboutIcon = $('<div>').addClass('img_member');
    var img = $('<img>').attr('src', member.imagem).attr('alt', member.name);
    aboutIcon.append(img);

    var textAbout = $('<div>').addClass('member_summary');
    var memberName = $('<span>').attr('id', 'name').text(member.titulo);
    var memberSummary = $('<p>').attr('id', 'p').text(member.texto);
    textAbout.append(memberName, memberSummary);

    aboutCard.append(aboutIcon, textAbout);
    container.append(aboutCard);
  });
}

// Página de Denúncias Anônimas
// Denúncia anonima
function enviarDenuncia() {
  $('#denunciaForm').submit(function(event) {
      event.preventDefault();
      var formData = $(this).serialize();

      $.ajax({
          type: 'POST',
          url: 'config/e-mail.php',
          data: formData,
          success: function(response) {
              $('#denunciaForm')[0].reset();
              alert(response);
          },
          error: function(xhr, status, error) {
              alert('Erro ao enviar a denúncia: ' + error);
          }
      });
  });
}

function toggleMenuOnClick() {
  var menuHamb = $('.menu-hamb');
  var menuOfc = $('.menu-ofc');
  var hamb = $('.hamburguer');

  menuOfc.hide();

  menuHamb.click(function () {
    if ($(window).width() < 1023) {
      var isVisible = menuOfc.is(':visible');

      if (isVisible) {
        menuOfc.slideUp('fast');
        hamb.removeClass('open');
      } else {
        menuOfc.slideDown('fast');
        hamb.addClass('open');
      }
    }
  });
}
