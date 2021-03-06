<!---
 Copyright (c) 2018 PROPHESSOR
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# UDMF Map Processor Script

В данном файле описан процесс создания скриптов для системы UDMF Map Processor (сокр. UMP).

**UMP** - Это система скриптовой обработки UDMF карт. Изначально создавалась как скрипт для улучшения имеющихся карт (добавления динамического света на стены в зависимости от текстуры), но может так же использоваться для генерации новых карт, применения различных фильтров, изменения геометрии и просто массового редактирования чего-либо на существующих картах.

Система построена на принципе скриптов. **Любой** человек, разбирающийся в программироваии, и в JavaScript в частности, может написать свой скрипт, который будет выполнять конкретное действие.
Список скрипты для программы можно найти [здесь](http://i.iddqd.ru/viewtopic.php?p=101116).

## Запуск

Для запуска системы Вам понадобится [Node.JS](https://nodejs.org).

Поместите файл TEXTMAP (его можно достать из wad файла UDMF карты) input.

Затем, выполните в консоли (перейдя в папку установки) следующее:

```sh
npm start
```

Если всё сделано правильно - должно вывести сообщение, что обработка завершена.
После этого Вы можете забрать обработанный TEXTMAP из папки output

## Установка скриптов

Для установки - поместите папку скрипта в директорию scripts.
Что бы путь был примерно таким: `/путь/до/папки/установки/scripts/папка_скрипта/`.
**Внимание!** В папке скрипта **обязательно** должен быть файл umpscript.json.

# Руководство по написанию скриптов

## Описание файлов

Короткое содержание этого каталога:

- README.md - Информационный файл. Необязателен.
- umpscript.json - Информация о скрипте. Обязателен.
- script.js - Файл с текстом скрипта. Название определяется в umpscript.json. Обязателен

### umpscript.json

Любой UMP скрипт должен содержать файл umpscript.json.
В этом файле содержится информация о самом скрипте, его авторе, параметрах запуска и прочем.

Файл начинается открывающейся фигурной скобкой и заканчивается закрывающейся.
Тело файла состаит из полей и значений, отделяемых друг от друга с помощью символа `:`

Рассмотрим подробнее каждое поле:

- name - Название скрипта (одно слово);
- author - Автор(ы) скрипта;
- version - Версия скрипта в [формате Semver](https://semver.org/lang/ru/);
- description - Описание скрипта;
- url - Адрес сайта/информационной страницы скрипта;
- main - Имя файла с текстом скрипта
- dependencies - Объект зависимостей. *Где поле это название зависимости, а значение - версия*

### README.md

Данный файл создан как руководство по созданию скриптов.
Вы так же можете использовать такие файлы в своих скриптах для подробного описания скрипта, или просто текста.

### script.js

Как было написано выше, данный файл может иметь и другое название - главное, что бы оно было написано так же в поле **main** файла umpscript.json.
Данный файл содержит сам текст скрипта, т.е. является самим скриптом.

Он имеет следующий вид:

```js
module.exports = function(udmfarray, udmfobject, lines) {
    // Здесь будет код скрипта
    return udmf;
}
```

Он принимает 2 аргумента:

- udmfarray     - [udmf массив](#udmfarray)
- udmfobject    - [udmf объект](#udmfobject)

Для записи доступен только первый.

Скрипт должен вернуть udmfarray, который передастся следующему скрипту.

**Внимание!** Для скриптинга используется язык программирования JavaScript, так что, Вам следует сначала изучить его, если Вы его ещё не знаете.

## Описание структур и терминов

### <a name="udmfarray">udmfarray (udmf массив)</a>

udmf массив служит для представления структуры udmf файла внутри UMP.
Он представляет из себя массив "блоков", расположенных в определенном порядке.

Структура блока:

```js
[тип_блока, {параметры блока}]
```

Всего существует 5 типов блоков:

- thing (предмет)
- linedef (линия)
- sidedef (сторона)
- vertex (вершина)
- sector (сектор)

У каждого из которых свой набор параметров, например, параметры вершины выглядят так:

```js
["vertex", { x: 0.000, y: 0.000 }]
```

Подробнее о параметрах каждого типа блоков можно прочитать [здесь](https://github.com/rheit/zdoom/blob/master/specs/udmf.txt#L244)

### <a name="udmfobject">udmfobject (udmf объект)</a>

Данная структура данных представляет собой udmf объект, состоящий из udmf массивов, разделенным по типам блоков.

Имеет следующий вид:

```js
{
    "thing":    []
    "linedef":  [],
    "sidedef":  [],
    "vertex":   [],
    "sector":   []
}
```

Где каждое из полей является соответствующим udmf массивом