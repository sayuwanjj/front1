(function () {
    var STORAGE_KEY = 'theme';
    var root = document.documentElement;
    var mql = window.matchMedia('(prefers-color-scheme: dark)');

    function currentTheme() {
        return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }

    function applyTheme(theme, withTransition) {
        if (withTransition) {
            root.classList.add('theme-transition');
            setTimeout(function () { 
                root.classList.remove('theme-transition'); 
            }, 220);
        }
        
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }

        // Сохраняем в localStorage
        localStorage.setItem(STORAGE_KEY, theme);
        
        // Обновляем кнопку, если она существует
        var btn = document.getElementById('themeToggle');
        if (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            // Обновляем иконку кнопки
            var icon = btn.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'dark' ? '🌙' : '☀️';
            }
        }
    }

    // Инициализация при загрузке страницы
    window.addEventListener('DOMContentLoaded', function () {
        // Применяем сохраненную тему
        var savedTheme = localStorage.getItem(STORAGE_KEY);
        if (savedTheme) {
            applyTheme(savedTheme, false);
        }
        
        // Настраиваем кнопку переключения
        var btn = document.getElementById('themeToggle');
        if (btn) {
            btn.setAttribute('aria-pressed', String(currentTheme() === 'dark'));
            
            // Обновляем иконку при загрузке
            var icon = btn.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = currentTheme() === 'dark' ? '🌙' : '☀️';
            }
            
            btn.addEventListener('click', function () {
                var next = currentTheme() === 'dark' ? 'light' : 'dark';
                applyTheme(next, true);
            });
        }
    });

    // Следим за изменениями системной темы
    mql.addEventListener && mql.addEventListener('change', function (e) {
        var explicit = localStorage.getItem(STORAGE_KEY);
        // Меняем тему только если пользователь не делал явный выбор
        if (explicit !== 'light' && explicit !== 'dark') {
            applyTheme(e.matches ? 'dark' : 'light', true);
        }
    });
})();