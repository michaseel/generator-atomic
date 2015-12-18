@objects
  <%= modulenameCamelized %>                .<%= modulenameCamelized %>
  maincontent           body > .container
  header                header
  footer                footer


= Main section =

  @on all
    <%= modulenameCamelized %>:
        height 40px

  @on lg
    <%= modulenameCamelized %>:
        height 30px

  @on xs, sm
    <%= modulenameCamelized %>:
        height 20px


