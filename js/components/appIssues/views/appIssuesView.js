/* global define, Backbone, _ */
define([
    'app/config',

    'components/appIssues/controller/appIssuesController',

    'dojo/text!../templates/appIssuesTemplate.html'
  ],

  function(
    config,

    appIssuesController,

    viewTemplate

  ) {
    var appIssues = Backbone.View.extend({

      events: {},

      initialize: function() {
        this.render();
      },

      render: function() {

        var template = _.template(viewTemplate);
        var options = {
          gitHub: config.gitHub
        };

        this.$el.html(template(options));
        this.startup();
      },

      startup: function() {
        this.initComponents();
      },

      initComponents: function() {
        $('.closeSplash').on('click', function(){
          $('.appIssuesModal').modal('hide');
        });

        /* I don't remember writing this.  Did you? */
        // $('#appIssuesDescription, #appIssuesName, #appIssuesEmail').on('input', function(){
        //   appIssuesController.buildLink();
        // });

        $('.appIssuesSubmit').on('click', function(){
          var emailData = {
                            to: config.appEmail,
                            to_name: '',
                            from: $('#appIssuesEmail').val(),
                            from_name: $('#appIssuesName').val(),
                            subject: 'Solar Suitability Data Issue',
                            body: 'An error was found with the Solar Suitability app.  Please see below for a description:<br><br>' + $('#appIssuesDescription').val(),
                            skey: 'Vdb2PwCgMQsEVV3jWfLvqEMLeXchevqq'
                          };

          $.post('api/email.php', emailData, function(data){
            $('.appIssuesModal').modal('hide');
          });
        });
      }

    });
    return appIssues;
  });