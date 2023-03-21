---
title: <% tp.file.title %>
tag: <% tp.file.folder(false) %>
publish: false
creation date: <% tp.file.creation_date() %>
modification date: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm:ss") %>
---

## Definition:
## Example:
## Syntax:
## Link:
---
Link : <% tp.user.link_splitter(tp.file.title, tp.file.folder(true)) %>
Tag:  <%_ tp.user.tag_splitter(tp.file.title, tp.file.folder(false)) _%>