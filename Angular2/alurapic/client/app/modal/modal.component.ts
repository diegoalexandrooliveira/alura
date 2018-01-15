import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "modal",
    templateUrl: "./modal.component.html"
})
export class ModalComponent implements AfterViewInit {
    @Input() private titulo: string = "Tem certeza?";
    @Input() private frase: string;
    @Output() confirma = new EventEmitter();

    constructor(private _elemento: ElementRef) {
        this._elemento = _elemento;
    }

    ngAfterViewInit() {
        $(this._elemento.nativeElement).dialog({
            title: this.titulo,
            autoOpen: false,
            resizable: false,
            modal: true,
            buttons: {
                Cancelar: () =>
                    this._fecharModal(),
                Confirmar: () => {
                    this._fecharModal();
                    this.confirma.emit(null);
                }
            }
        });
    }

    show() {
        $(this._elemento.nativeElement).dialog('open');
    }

    private _fadeOut(callBack): void {
        $(this._elemento.nativeElement).fadeOut(callBack);
    }

    private _fecharModal() {
        $(this._elemento.nativeElement).fadeOut(600, () => $(this._elemento.nativeElement).dialog("close"));
    }
}