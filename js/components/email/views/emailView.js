/* global define, Backbone, _ */
define([
    'app/config',

    'components/email/controller/emailController',

    'dojo/text!../templates/emailTemplate.html'
  ],

  function(
    config,

    emailController,

    viewTemplate

  ) {
    var email = Backbone.View.extend({

      events: {},

      initialize: function() {
        this.render();
      },

      render: function() {

        var template = _.template(viewTemplate);
        var options = {
          
        };

        this.$el.html(template(options));
        this.startup();
      },

      startup: function() {
        this.initComponents();
      },

      initComponents: function() {

        $('.closeSplash').on('click', function(){
          $('.emailModal').modal('hide');
        });

        $('.emailSubmit').on('click', function(){
          var emailLink = emailController.buildEmailLink();
          var emailData = {
                            to: $('#recipEmail').val(),
                            to_name: '',
                            from: $('#emailEmail').val(),
                            from_name: $('#emailName').val(),
                            subject: 'Solar Suitability Report',
                            body: '<p>A Solar Suitability Analysis Report has been shared with you. Click the link below to view:</p><p><a href="' + emailLink + '">' + emailLink + '</a></p><p>' + $('#customMsg').val() + '</p>',
                            skey: 'Vdb2PwCgMQsEVV3jWfLvqEMLeXchevqq'
                          };

          $.post('api/email.php', emailData, function(data){
            $('.emailModal').modal('hide');
          });
        });
        
      }

    });
    return email;
  });