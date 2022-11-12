
(
    function () {

        /**
         *
         * @param hour
         * @param isReserved
         * @returns {{hour: *, isReserved: *}}
         * @constructor
         */
        function Turno(hour, isReserved, name) {
            return {
                hour: hour,
                isReserved: isReserved,
                name: name

            };
        }


        let turnos = [];


        for (let i = 9; i < 24; i++) {
            turnos.push(new Turno(i, false, ' '));
        };

        let toggleTurno = function () {

            let $this = $(this);
            let idTurnoRes = 'turnoReservado' + $this.data('hour');
            let idname = 'name' + $this.data('name');
            let isReserved = $this.data('isReserved');


            switch ($this.attr('class')) {
                case "btn btn-sm btn-info":
                    cancelarTurno($this, idname, idTurnoRes);

                    break

                case "btn btn-sm btn-default":

                    reservarTurno($this, idname, idTurnoRes);

                    break;
            }
        }

        let reservarTurno = function ($this, idname, idTurnoRes) {

            let band = prompt("Ingrese su nombre por Favor");

            if (band != '') {

                let name = $this.data('name', band);

                let disabled = $('#' + idTurnoRes).addClass('disabled');

                let label = $('<span id="' + idname + '" class="label label-info">' + $this.data('name') + '</span>');

                disabled.append(label);
                isReserved = true;
                $this.toggleClass('btn-info btn-default');

            } else {

                alert('por favor, ingrese un nombre')
            }

        }

        let cancelarTurno = function ($this, idname, idTurnoRes) {

            let name = $this.data('name', '');
            let attr = $('.label.label-info').remove();
            $('#' + idTurnoRes).removeClass('disabled');
            isReserved = false;
            $this.toggleClass('btn-default btn-info');
        }



        for (hora in turnos) {

            let turno = turnos[hora];
            let id = 'id' + turno.hour;
            let name = turno.name;

            let item = $('<li class="btn btn-sm btn-default" id="' + id + '" data-hour="' + turno.hour + '" data-is-reserved="' + turno.isReserved + '" data-name="' + turno.name + '">' + turnos[hora].hour + ':00' + '</li>');

            $('#horario').append(item);


            let idTurnoRes = 'turnoReservado' + item.data('hour');

            let linea = $('<li id="' + idTurnoRes + '" class="list-group-item">' + item.data('hour') + '</li>');

            $('#planilla').append(linea);

            $('#' + id).on('click', toggleTurno);

        };
    }()
);