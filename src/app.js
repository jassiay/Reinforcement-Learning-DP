App = {
    REW:-1,
    gamma: 1,
    grids : [],
    policies: [],

    init: function () {
        $(document).on("click", '#but', App.sweep);
        for (i=0; i<16; i++) {
            App.grids[i] = 0;
        }
        
    },


    hitWall: function(n) {
        if (n == 1 || n == 2) {
            return "up";
        } else if (n == 4 || n == 8) {
            return "left";
        } else if (n == 7 || n == 11) {
            return "right";
        } else if (n == 13 || n == 14) {
            return "down";
        } else if (n == 3) {
            return "ur";
        } else if (n == 12) {
            return "dl";
        } else if (n == 0 || n == 15) {
            return "endpoint";
        } else
            return 0;
    },
    
    bellman: function(n) {
        var v = 0;
    
        switch (App.hitWall(n)) {
            case 0:
                v = 0.25 * ((App.REW + App.grids[n-1]) + (App.REW + App.grids[n+1]) + (App.REW + App.grids[n-4]) + (App.REW + App.grids[n+4]));
                break;
            case "left":
                v = 0.25 * ((App.REW + App.grids[n]) + (App.REW + App.grids[n+1]) + (App.REW + App.grids[n-4]) + (App.REW + App.grids[n+4]));
                break;
            case "right":
                v = 0.25 * ((App.REW + App.grids[n-1]) + (App.REW + App.grids[n]) + (App.REW + App.grids[n-4]) + (App.REW + App.grids[n+4]));
                break;
            case "up":
                v = 0.25 * ((App.REW + App.grids[n-1]) + (App.REW + App.grids[n+1]) + (App.REW + App.grids[n]) + (App.REW + App.grids[n+4]));
                break;
            case "down":
                v = 0.25 * ((App.REW + App.grids[n-1]) + (App.REW + App.grids[n+1]) + (App.REW + App.grids[n-4]) + (App.REW + App.grids[n]));
                break;
            case "ur":
                v = 0.25 * ((App.REW + App.grids[n-1]) + (App.REW + App.grids[n]) + (App.REW + App.grids[n]) + (App.REW + App.grids[n+4]));
                break;
            case "dl":
                v = 0.25 * ((App.REW + App.grids[n]) + (App.REW + App.grids[n+1]) + (App.REW + App.grids[n-4]) + (App.REW + App.grids[n]));
                break;
        }
    
        return v;
    },
    
    sweep: function() {
        var temp = [];
        for (i=0; i<16; i++) {
            temp[i] = Math.round(App.bellman(i)* 100) / 100;
        }
        
        App.grids = temp;

        return App.updateTable();
    },

    updateTable: function() {
        for (i=0; i<16; i++) {
            var id = "#" + i;
            $(id).html(App.grids[i]);
        }
    },

};

$(function() {
    $(window).on("load", function() {
      App.init();
    });
});